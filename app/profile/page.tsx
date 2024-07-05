import { getSession } from "@auth0/nextjs-auth0";

export default async function Profile() {
  const session = await getSession();
  if (!session || !session.user) {
    return <p>You are not logged in</p>;
  }

  const { user } = session;

  return (
    user && (
      <>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <a href="/api/auth/logout">Logout</a>
      </>
    )
  );
}
