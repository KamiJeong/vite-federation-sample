import tw from 'twin.macro';
import { Outlet, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Hello = lazy(() => import('postApp/Hello'));

const LINKS = [
	{ key: 'home', link: '/', label: 'Home' },
	{ key: 'posts', link: '/posts', label: 'Posts' },
];

const App = () => (
	<>
		<ul css={[tw`flex flex-wrap items-center justify-center bg-black text-gray-900 text-white`]}>
			{LINKS.map(({ key, link, label }) => (
				<li key={key}>
					<NavLink to={link} css={[tw`px-5 py-3 hover:underline md:mr-6`]}>
						{label}
					</NavLink>
				</li>
			))}
		</ul>
		<div css={[tw`flex min-h-screen items-center justify-center`]}>
			<Suspense fallback="loading......">
				<Hello />
			</Suspense>
			<Outlet />
		</div>
	</>
);

export default App;
