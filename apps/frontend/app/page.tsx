import { client } from "@repo/db/client"

export default async function Home() {
  const users = await client.user.findMany();
  return <div>
    {
      users.map((user, id) => (
        <div key={id}>
          <p>{user.id}</p>
          <p>{user.email}</p>
        </div>
      ))
    }
  </div>
}