---
title: 'Going Static with NextJS and TailwindCSS'
excerpt: 'A long overdue facelift is complete! In this post we look at the decisions behind using NextJS and TailwindCSS for our new homepage.'
date: '2020-02-06'
slug: 'going-static-with-nextjs-and-tailwindcss'
authors:
  - name: Sean Callan
    github: https://github.com/doomspork
tags:
  - 'TailwindCSS'
  - 'NextJS'
---

Before we broke ground on a new homepage we knew a migration to a different technology stack for exploratory and educational purposes was in order. With its rocket growth in popularity it was a no-brainer picking TailwindCSS, but even with the popularity I didn't set my hopes too high because admittedly: I don't enjoy CSS no matter what flavor, or so I thought.

The choices were made, code was written, and a site deployed. 

### TailwindCSS

> A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

There is no disputing TailwindCSS is verbose but it turns out to be a small price to pay when you'll need virtually no custom CSS. I've never been bashful about proclaiming my distaste CSS work, it's always felt like more of a chore than it should be but I can honestly say that TailwindCSS has caused me to step back and reevaluate my stance. Now styling a component is much like writing out a sentence that describes what you want to accomplish.

The UI portion of any project has always been my achilles heel but other Utensils partners will atest to recent marathon of project development solely fueled by TailwindCSS making CSS feel approachable. Now that this is complete I'm excited to further my knowledge and experience with Tailwind through some upcoming projects. There I hope to explore some of the other plugins and expand on my usage of custom configurations.

### NextJS

> Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

NextJS includes a plethora of features but we'll be using it for one specific feature: exporting as a static site. With NextJS we can build our site with React, a technology we're well acquainted with, but produce a static and simple to deploy site. When our needs demand something more flexible, NextJS can be deployed as an SPA and can make use of SSR.

For now `npm run export` is all we need to convert our React application and data into a deployable static site.