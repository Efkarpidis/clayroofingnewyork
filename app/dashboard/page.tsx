import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const token = cookies().get('auth-token')?.value;
  if (!token) redirect('/contact?login-required=true');

  const [userRes] = await pool.query('SELECT * FROM users WHERE session_token = $1', [token]);
  const user = userRes.rows[0];
  if (!user) redirect('/contact');

  const [subsRes] = await pool.query(
    'SELECT * FROM submissions WHERE session_token = $1 OR email = $2 OR phone = $3 ORDER BY created_at DESC',
    [token, user.email, user.phone]
  );
  const submissions = subsRes.rows;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <p>Welcome back, {user.email || user.phone}! Here's your request history.</p>
      <div className="space-y-6 mt-8">
        {submissions.map((sub) => (
          <div key={sub.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">Request #{sub.id} - {new Date(sub.submitted_at).toLocaleDateString()}</h3>
            <p className="text-sm text-neutral-600">{sub.message}</p>
            <p>Status: {sub.status || 'Pending'} (Updated: {new Date(sub.updated_at || sub.submitted_at).toLocaleDateString()})</p>
            {sub.uploaded_files && (
              <div className="mt-2">
                <h4>Project Photos:</h4>
                {JSON.parse(sub.uploaded_files).map((photo: any) => (
                  <img key={photo.url} src={photo.url} alt="Project" className="w-32 h-32 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button asChild href="/contact">
        <a>New Request</a>
      </Button>
    </div>
  );
}
