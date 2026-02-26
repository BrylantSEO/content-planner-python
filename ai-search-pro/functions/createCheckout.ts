import Stripe from 'npm:stripe@17.4.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const { name, email, phone, company_name, return_url,
            utm_source, utm_medium, utm_campaign, utm_term, utm_content } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [{
        price: 'price_1SzbMDCwzejpNsfNyCNTi2HO',
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: `${return_url}?payment=success`,
      cancel_url: `${return_url}?payment=cancelled`,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
        name,
        email,
        phone: phone || '',
        company_name: company_name || '',
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_term: utm_term || '',
        utm_content: utm_content || '',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});