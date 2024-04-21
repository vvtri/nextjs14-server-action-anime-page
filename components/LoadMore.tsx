'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimeCard, { AnimeProp } from './AnimeCard';
import { fetchAnime } from '@/app/action';

let page = 2;

function LoadMore() {
	const { ref, inView } = useInView();
	const [data, setData] = useState<AnimeProp[]>([]);

	useEffect(() => {
		if (!inView) return;

		fetchAnime(2).then((anime) => {
			setData(data.concat(anime));
			page += 1;
		});
	}, [inView]);

	return (
		<>
			<section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
				{data.map((item: AnimeProp, index) => (
					<AnimeCard
						key={item.id}
						anime={item}
						index={index}
						delay={(index % 8) * 0.25}
					/>
				))}
			</section>

			<section className='flex justify-center items-center w-full'>
				<div ref={ref}>
					<Image
						src='./spinner.svg'
						alt='spinner'
						width={56}
						height={56}
						className='object-contain'
					/>
				</div>
			</section>
		</>
	);
}

export default LoadMore;
