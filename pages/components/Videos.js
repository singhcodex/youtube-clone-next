import Video from "./Video"

export default function Videos({videos}){
    if(!videos) return null

    return (
        <>
        <div className="flex flex-wrap bg-black">
        {videos.map((video, index) => (
            <div key={index} className="w-full md:w-1/2 ld:w-1/3">
            <Video video={video}/>
            </div>
        ))}
        </div>
        </>
    )
}