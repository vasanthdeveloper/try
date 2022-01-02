/*
 *  Vite.js bundler config for index project.
 *  Created On 01 January 2022
 */

import merge from 'deepmerge';
import { defineConfig } from 'vite';
import base from '../../vite.config.js';
import copy from 'rollup-plugin-copy';
import { VitePWA } from 'vite-plugin-pwa';

const config = merge(base, defineConfig({
    build: {
        emptyOutDir: false,
        outDir: '../../../dist',
        rollupOptions: {
            plugins: [
                copy({
                    targets: [
                        { src: './src/assets/img/site_icon.png', dest: '../../dist/' }
                    ]
                })
            ]
        }
    },
    plugins: []
}))

config.plugins.push(
    // configure and setup this website as a Progressive Web App
VitePWA({
    manifest: {
        name: 'Try Outs',
        short_name: 'Try Outs',
        orientation: 'portrait-primary',
        theme_color: '#FFFFFF',
        description: 'Playground where I try & create different components and pages.',
        icons: [
            {
                src: 'site_icon.png',
                sizes: '540x540',
                type: 'image/png'
            }
        ]
    },
    workbox: {
        runtimeCaching: [
            {
                urlPattern: /.+try.vsnth.dev.+/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'try',
                    expiration: {
                        // an hour
                        maxAgeSeconds: 3600
                    }
                }
            },
            {
                urlPattern: /.+raw.githubusercontent.com.+/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'github-api',
                    expiration: {
                        // an hour
                        maxAgeSeconds: 3600
                    }
                }
            },
            {
                urlPattern: /.+vyaktitva.vercel.app.+/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'fonts',
                    expiration: {
                        // one week
                        maxAgeSeconds: 3600 * 168
                    }
                }
            },
            {
                urlPattern: /.+unpkg.com.+|.+cdn.skypack.dev.+|.+cdn.tailwindcss.com.+/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'lib',
                    expiration: {
                        // a day
                        maxAgeSeconds: 3600 * 24
                    }
                }
            }
        ]
    }
})
)

export default config

