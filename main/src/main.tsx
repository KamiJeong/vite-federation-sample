import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';

const Home = lazy(() => import('./pages/home'));
const Posts = lazy(() => import('./pages/posts'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback="Loading...">
						<Home />
					</Suspense>
				),
			},
			{
				path: 'posts',
				element: (
					<Suspense fallback="Loading...">
						<Posts />
					</Suspense>
				),
				children: [
					{
						path: ':id',
						element: (
							<Suspense fallback="Loading...">
								<Posts />
							</Suspense>
						),
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
