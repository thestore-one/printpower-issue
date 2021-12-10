export default function Home({ data }) {

  return (
    <>
      <div dangerouslySetInnerHTML={{__html: data.intro}} />
    </>
  )
}

export async function getStaticProps() {
	const res = await fetch(process.env.WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query startQuery {
        page(id: "58", idType: DATABASE_ID) {
          startsidaContent {
            intro
          }
        }
      }
      `
    })
	})

	const json = await res.json()

	return {
    props: {
      data: json.data.page.startsidaContent,
    },
    revalidate: 2,
	}
}