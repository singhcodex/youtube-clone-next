export default function Utils(){
    return (
        <>
        <div className="container m-auto">
            <h2 className="text-center text-xl font-bold underlline">Utils</h2>

            <div className="flex-1 mb-5 mt-5 text-center">
                <button className="border border-black rounded-full px-8 py-2 hover:bg-slate-600 hover:text-white"
                onClick={ async () => {
                    await fetch('/api/utils', {
                        body: JSON.stringify({
                            task: 'generate_content'
                        }),
                        headers: { 'Content-Type': 'application/json'},
                        method: 'POST'
                    })    
                
                }}>
                    Generate Content
                </button>
            </div>
            <div className="flex-1 mb-5 mt-5 text-center">
                <button className="border border-black rounded-full px-8 py-2 hover:bg-slate-600 hover:text-white"
                onClick={ async () => {
                    await fetch('/api/utils', {
                        body: JSON.stringify({
                            task: 'clean_database'
                        }),
                        headers: { 'Content-Type': 'application/json'},
                        method: 'POST'
                    })    
                
                }}>
                   Clean Databse
                </button>
            </div>
        </div>
        </>
    )
}