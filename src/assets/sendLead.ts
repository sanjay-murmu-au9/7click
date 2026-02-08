// API utility for sending contact form data
export async function sendLead(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const res = await fetch(
    "https://digldzbwgoqnwuhpdjuw.supabase.co/functions/v1/send-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Something went wrong");
  }

  return json;
}
