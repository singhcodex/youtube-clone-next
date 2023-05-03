import prisma from "@/lib/prisma"
import { faker } from '@faker-js/faker'

export default async function handler(req, res){
    if(req.method !== 'POST') return res.end()

    if(req.body.task === 'generate_content'){
        let usersCount = 0

        while(usersCount < 10){
            await prisma.user.create({
                data: {
                    name: faker.name.fullName(),
                    username: faker.internet.userName().toLowerCase(),
                    email: faker.internet.email().toLowerCase(),
                    image: faker.image.avatar(),

                }
            })
            usersCount++
        }

        const videoUrl = 'https://bootcamp-singh.fra1.digitaloceanspaces.com/SampleVideo_1280x720_2mb.mp4'
        const thumbnailUrl = 'https://bootcamp-singh.fra1.digitaloceanspaces.com/azamat-e-ooCoR8x0MmY-unsplash.jpg'

        const users = await prisma.user.findMany()

        const getRandomUser = () => {
            const randomIndex = Math.floor(Math.random() * users.length)

            return users[randomIndex]
        }

        let videoCount = 0

        while(videoCount < 20) {
            await prisma.video.create({
                data: {
                    title: faker.lorem.words(),
                    thumbnail: thumbnailUrl,
                    url: videoUrl,
                    length: faker.datatype.number(1000),
                    visibility: 'public',
                    views: faker.datatype.number(1000),
                    author: {
                        connect: {id: getRandomUser().id },
                    }
                },
            })
            videoCount++
        }
    }



    if(req.body.task === 'clean_database'){
        await prisma.user.deleteMany({})
    }

    res.end()
}