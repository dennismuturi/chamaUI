
  const Contribution =  async () => {
 
    const res = await fetch("https://654cc20f77200d6ba8595c1b.mockapi.io/products",{
        cache:'no-cache'
    })

    const results = await res.json();

    
    return (
        <>
        <div>
            Contribution
        </div>
        <ul>
            {
                results?.map(result=> {
                    return (
                    <div key={result.id}>
                        <h1>{result.name}</h1>
                    </div>
                    )
                })
            }
            
        </ul>
        </>

    )
}

export default Contribution;