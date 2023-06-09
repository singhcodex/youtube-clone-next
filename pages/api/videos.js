import { amount } from "@/lib/config"
import { getVideos } from "@/lib/data"
import prisma from "@/lib/prisma"

export default async function handler(req, res){
    if(req.method !== 'GET'){
        return res.status(501).end()
    }

    if(req.method === 'GET'){
        const take = parseInt(req.query.take || amount)
        const skip = parseInt(req.query.skip || 0)
        const author = req.query.author

        const videos = await getVideos({take, skip, author}, prisma)

        res.json(videos)
    }
}