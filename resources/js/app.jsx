import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import Layout from './Layouts/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const pages = import.meta.glob('./Pages/**/*.jsx', {
    eager: true,
});

createInertiaApp({
    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`];

        page.default.layout =
            page.default.layout ||
            ((page) => <Layout>{page}</Layout>);

        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>
        );
    },
});