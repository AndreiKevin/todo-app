import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function Auth() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) console.error(error);
    else alert('Check your email for the login link!');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Send Magic Link</button>
    </div>
  );
}
