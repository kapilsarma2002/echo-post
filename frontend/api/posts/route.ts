import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getUserByClerkId } from '@/lib/auth'

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

	const user = await getUserByClerkId();

	try {
		const posts = await prisma.post.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				scheduledAt: 'desc',
			},
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch posts' });
	}
}