---
title: 'TIL: Persona-based Prompting'
excerpt: "Stop asking AI for generic responses and start telling it *who* to be. Let's explore how persona-based prompting gives your AI interactions personality and character."
date: '2025-04-22'
slug: 'til-persona-based-prompting'
authors:
  - name: Sean Callan
    github: https://github.com/doomspork
tags:
  - 'LLM'
  - 'Prompt Engineering'
  - 'TIL'
---

# TIL: Persona-based Prompting

Have you ever wanted to spice up your LLM responses or wondered how your favorite TV character might respond to a particular question? Well you're in luck! Today, we'll explore a technique to achieve just that: **Persona-based Prompting**.

## What is Persona-based Prompting?

At its core, persona-based prompting involves instructing an LLM to adopt a specific character or personality when generating its response. Instead of just telling it *what* to do, you tell it *who* to be while doing it.

## Isn't that just Role-based Prompting?

Yes and no. It's similar, but often more specific. Let's do a quick refresher on Role-based Prompting then jump into personas.

### Role-based Prompting Refresher 

With **Role-based Prompting** we are typically defining a function or job title: "Act as a senior software engineer," "Respond as a helpful customer service agent," "You are a world-class chef." Assigning this role to our LLM influences the _type_ of information, the level of detail, and the technical language used.

Let's ask our LLM to "Explain what blogging is."

**Prompt:** `Act as a technical writer and explain what blogging is.`

> **Technical Writer Role:** "Blogging is a digital content publishing practice where individuals or organizations create and maintain a website featuring regularly updated posts (called "blog posts") displayed in reverse chronological order. A blog (short for "weblog") functions as an online platform where writers share their thoughts, ideas, expertise, or experiences through text, images, videos, and other media. Blogs can range from personal journals to professional publications covering specific topics or industries. Blogs serve multiple purposes including personal expression, knowledge sharing, marketing, community building, and establishing thought leadership in a particular field."

**Prompt:** `Act as a grade school teacher and explain what blogging is.`

> **Grade School Teacher Role:** "Blogging is like keeping a special online diary or journal that other people can read. A blog is a website where someone writes regular posts about topics they care about. Blogs can be about anything - cooking, video games, science experiments, sports, or just daily life! Many schools now have classroom blogs where students can share their work and practice writing for a real audience. The word "blog" comes from "web log" - like a captain's log but on the internet. Blogging helps people share their ideas with the whole world!"

In these examples we see how the same prompt, with different roles, yields different tone, detail, and delivery.

### Giving Our Prompts _Persona_-lity

**Persona-based Prompting** goes deeper than Role-based Prompting allowing us to specify a _character_ with distinct traits, speaking style, quirks, and worldview. Think "Act as Gordon Ramsay reviewing my code" vs. just "Act as a code reviewer." The persona brings a unique voice and perspective that a simple role most often lacks.

Now imagine we want to know how some of our favorite TV personalities might explain a complex topic like: "Explain quantum entanglement."

**Prompt:** `Acting as Bob Ross, explain quantum entanglement.`

> **Bob Ross Persona:** "Well now, let's just paint a happy little picture of two tiny particles, see? They're like little friends, even when they're far apart in our big ol' universe. What happens to one instantly, and I mean *instantly*, affects the other, like they're connected by a happy little invisible thread running through the canvas. There's no mistake here, just a happy little quantum accident. Isn't that neat?"

**Prompt:** `Acting as Jerry Seinfeld doing stand-up, explain quantum entanglement.`

> **Jerry Seinfeld Persona:** "Quantum entanglement? What's the *deal* with these particles? Seriously! You got two particles, right? Maybe they met at a party, maybe they worked together, who knows. Then they go their separate ways, miles apart! But you measure one, 'Oh, look, it's spinning *up*!' and *instantly* the other one, across the universe, is spinning *down*? Instantly! Faster than light! How? Is there some kind of subatomic texting plan I don't know about? 'U up?' 'Nah, spinning down.' Who *are* these particles? Are they wearing matching outfits? It makes no sense!"

**Prompt:** `Acting as Sheldon Cooper from The Big Bang Theory, explain quantum entanglement.`

> **Sheldon Cooper Persona:** "Ah, quantum entanglement. A cornerstone of quantum mechanics, often misunderstood by the layman. It describes a fascinating phenomenon wherein two or more quantum particles become linked in such a way that they must be described in relation to one another, irrespective of the spatial separation between them. Measuring a specific quantum property, such as spin, of one particle instantaneously influences the correlated property of the other(s). It's crucial to note, however, that this does not permit faster-than-light communication of *information*, thereby preserving causality and complying with special relativity. It is merely a correlation inherent in the shared quantum state, as predicted by the EPR paradox and subsequently verified experimentally. Elementary, really. Bazinga."

See the difference? The core explanation might be vaguely similar, but the delivery, tone, analogies, and vocabulary are entirely shaped by the persona.

## Sure, But Why Bother?

Persona-based prompting is fantastic because it's fun _and_ useful for certain situations:

*   When used with creative writing we can create dialogue, stories, or marketing copy in specific characters' voices.
*   Much like Role-based Prompting we can provide tailored explanations that adjust the complexity and tone for different audiences but go a step further by using a familiar voice (e.g., explaining a concept to a child as Ms. Rachel).
*   We can use Persona-based Prompting to simulate how a specific character might react to a given situation.

But for me, the most important reason? Entertainment. It's just plain fun to see how different personalities might tackle a request! Maybe Snoop Dogg should write that email to HR? Or Linus summarizing your PR feedback to a colleague? 

The next time you're asking an LLM for insights don't just give it a role, give it a *persona*-lity! You might be surprised!