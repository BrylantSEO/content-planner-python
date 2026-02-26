import Stripe from 'npm:stripe@17.4.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { name, email, phone, company_name,
              utm_source, utm_medium, utm_campaign, utm_term, utm_content } = session.metadata;

      console.log('Payment completed for:', name, email);

      const registration = {
        name,
        email,
        phone: phone || '',
        company_name: company_name || '',
        status: 'Confirmed',
      };
      if (utm_source) registration.utm_source = utm_source;
      if (utm_medium) registration.utm_medium = utm_medium;
      if (utm_campaign) registration.utm_campaign = utm_campaign;
      if (utm_term) registration.utm_term = utm_term;
      if (utm_content) registration.utm_content = utm_content;

      await base44.asServiceRole.entities.Registration.create(registration);

      console.log('Registration created successfully');
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return Response.json({ error: error.message }, { status: 400 });
  }
});