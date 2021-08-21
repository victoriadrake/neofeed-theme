# ![Twinkling star](https://github.com/victoriadrake/neofeed-theme/blob/379bdeb10c934ca8e96075543b51ad993be4e265/images/littlestar.gif?raw=true) Neofeed ![Twinkling star](https://github.com/victoriadrake/neofeed-theme/blob/379bdeb10c934ca8e96075543b51ad993be4e265/images/littlestar.gif?raw=true)

(っ◔◡◔)っ A personal timeline for the IndieWeb that can deploy to Neocities and GitHub Pages.

- Like Twitter but it doesn't suck
- Like Geocities except it exists

✨ Neofeed is a beginner-friendly starter site to learn to use Hugo and generate awesome static websites with continuous delivery. This enriched Hugo theme helps you create a plain HTML static website. You can deploy to Neocities and GitHub Pages with continuous deployment workflows out of the box!

🖌 Use CSS skins to switch it up and make it your own. Feeling brave? All the source code is at your fingertips. Go nuts! 🥜

- [Screenshots](#screenshots)
- [The General Idea](#the-general-idea)
- [Git Started](#git-started)
  - [Deploy without Hugo (stand alone site)](#deploy-without-hugo-stand-alone-site)
  - [Use as a Hugo theme](#use-as-a-hugo-theme)
    - [1. Add this theme](#1-add-this-theme)
    - [2. Update your `config` file](#2-update-your-config-file)
    - [3. Write and deploy](#3-write-and-deploy)
- [IndieWeb Features](#indieweb-features)
  - [Different Post Types](#different-post-types)
- [Learn and Customize with Hugo](#learn-and-customize-with-hugo)
  - [Edit or Create a CSS Skin](#edit-or-create-a-css-skin)
  - [Totally Optional Cool Stuff](#totally-optional-cool-stuff)
    - [Plausible](#plausible)
    - [Web Monetization](#web-monetization)
- [Contributing](#contributing)
  - [Values](#values)

## Screenshots

With just CSS you can make your Neofeed look like _anything you can imagine._ Here are a few options for you to use, change, or extend right out of the box.

<img width="500" alt="Neofeed with macintosh CSS skin" src="https://raw.githubusercontent.com/victoriadrake/neofeed-theme/master/images/macintosh.png" />
<img width="500" alt="Neofeed with minimal CSS skin" src="https://raw.githubusercontent.com/victoriadrake/neofeed-theme/master/images/minimal.png" />
<img width="500" alt="Neofeed with cloudy-day CSS skin" src="https://raw.githubusercontent.com/victoriadrake/neofeed-theme/master/images/cloudy-day-dark.png" />

## The General Idea

Neofeed is an enriched Hugo theme. It gives you a fun starting point for creating your own personal feed on your own personal website! Customize as little or as much as you want and join the IndieWeb movement.

Starting from scratch? Check out the [Neocities Tutorials](https://neocities.org/tutorials).

You can edit your `config.toml` to customize basic website things, like your site title, your name, and some "about me" text. That's all you need to deploy a great-looking Neofeed.

You can choose from pre-made CSS skins with automatic light and dark modes. Create your own to give your Neofeed personality, or share a CSS skin you made with a pull request to this repository!

Day-to-day, you can deploy your own personal feed updates to your Neocities website as well as GitHub Pages with two commands.

```sh
make entry
# ---
# title: 7c483a16-7931-43d7-9417-80124a06a4fa
# date: 2021-01-03T07:03:33 
# categories: ["note"]
# tags: 
# ---
# Hello world! Let's take back the timeline.
make ship
```

A special [self-documenting Makefile](https://victoria.dev/blog/how-to-create-a-self-documenting-makefile/) makes this possible. Run `make help` in the repository root to see what you can do.

## Git Started

### Deploy without Hugo (stand alone site)

If you have [Git](https://git-scm.com/) and [Make](https://pubs.opengroup.org/onlinepubs/9699919799/) or [GNU Make](https://www.gnu.org/software/make/), Neofeed can be set up and deployed without installing any additional dependencies.

1. Fork the repository.
2. Get your Neocities API key by going to:

    `https://neocities.org/settings/{{your-sitename}}#api_key`
3. Set up your Neocities API key as a [repository secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) called `NEOCITIES_API_TOKEN`.

Then run:

```sh
git clone https://github.com/<your username>/neofeed-theme.git neofeed
cd neofeed
```

3. Edit the `config.toml` file to name your site and choose options.
4. Create your first entry and ship it!

```sh
make entry
# Write something clever in your $EDITOR
make ship
```

This will build your Neofeed and deploy it to Neocities using the [included GitHub Actions workflow](https://github.com/victoriadrake/neofeed-theme/blob/master/.github/workflows/build.yaml)!

Your site can also be served by Github Pages. Make it so by [configuring the publishing source](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) to be your `docs/` directory.

### Use as a Hugo theme

[Hugo](https://gohugo.io/) is a static site generator that helps make it easy to create a website made with plain HTML. See the [quickstart](https://gohugo.io/getting-started/quick-start/) to create your site then follow these three steps.

#### 1. Add this theme

Add this theme to your Hugo site by running this command from the site's main folder:

```sh
cd <whatever you named your site folder>
git submodule add https://github.com/victoriadrake/neofeed-theme.git
```

#### 2. Update your `config` file

Copy the [exampleSite configuration file](https://github.com/victoriadrake/neofeed-theme/blob/master/exampleSite/config.toml) to your site's main folder. Update the settings as you like -- helpful comments are included.

Be sure to replace `example.com` with your own domain throughout the file.

#### 3. Write and deploy

You can use the `make entry` command or manually [add some content](https://gohugo.io/getting-started/quick-start/#step-4-add-some-content).

When you're ready, you can deploy automatically with services like:

- [Neocities](https://neocities.org/), either using the [included workflow](https://github.com/victoriadrake/neofeed-theme/blob/master/.github/workflows/build.yaml) or drag-and-drop upload.
- GitHub Actions can deploy to [GitHub Pages](https://pages.github.com/) using the [included workflow](https://github.com/victoriadrake/neofeed-theme/blob/master/.github/workflows/build.yaml). Just [configure your publishing source](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) to be your `docs/` directory.
- Other repository hosting services, like [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) can also serve static sites.

## IndieWeb Features

Neofeed supports formats and protocols that encourage independent websites! To learn more about these, the community over at [IndieWebCamp](https://indieweb.org/discuss) is a great place to ask questions.

Here are the features Neofeed currently supports:

- Individual posts will render [Webmentions](https://www.w3.org/TR/webmention/) with support via [Webmention.io](https://webmention.io/)
- Your posts can be automatically shared with other social media thanks to [Bridgy](https://brid.gy/) (see more about Publish (on your) Own Site, Syndicate Elsewhere [(POSSE)](https://indieweb.org/POSSE) on the IndieWebCamp wiki)
- Your feed can be parsed by RSS and feed readers thanks to [h-card](https://microformats.org/wiki/h-card), [h-feed](https://microformats.org/wiki/h-feed), and [h-entry](https://microformats.org/wiki/h-entry) [microformats2](https://microformats.org/wiki/microformats2) markup
- You can log into supported services using [IndieAuth](https://indieweb.org/IndieAuth) [`rel=me` links](https://indieweb.org/rel-me) (they're in the [head](https://github.com/victoriadrake/neofeed-theme/blob/master/layouts/partials/head.html) file)

### Different Post Types

Your posts will be displayed slightly differently depending on the `category` you put in your front matter:

```text
---
title: My Awesome Post
date: 2021-08-05T23:01:26 
categories: ["note"] # note, reply, anything else
reply: # If you choose "reply" above, the URL you're replying to
tags: 
---
```

- If it's a `note`, just the text will show in your feed, like a tweet or microblog (this takes precedence over other categories)
- A post with category `reply` will display a post title that links to the page you're replying to with proper [reply markup](https://microformats.org/wiki/h-entry)

Check out the example site for... examples! Just do `make demo` to see it.

## Learn and Customize with Hugo

If you wish to edit the theme, create a CSS skin, or preview your timeline locally before deploying it, you'll need the [Hugo static site generator](http://gohugo.io/).

You can install the latest version by running `make gethugo`.

To see available Hugo commands, type `hugo --help`. [Hugo's searchable documentation](https://gohugo.io/documentation/) is also excellent. I recommend familiarizing yourself with Hugo's concepts using the [Quickstart](https://gohugo.io/getting-started/quick-start/).

### Edit or Create a CSS Skin

Look in `static/skins/` to find the CSS files that give Neofeed personality. Choose one or create your own and configure your Neofeed to use it in `config.toml`:

```toml
[params]
skin = "macintosh"
```

Consider this your CSS playground! You can preview changes in your browser with [live reload](https://gohugo.io/getting-started/usage/#livereload) by running Hugo's local server with `hugo server`. See the Hugo docs for [more server options](https://gohugo.io/commands/hugo_server/).

If you create a CSS skin you'd like to share, please consider sending a pull request to add it to this repository!

### Totally Optional Cool Stuff

Neofeed has out-of-the-box support for these features.

#### Plausible

You can set up site analytics using [Plausible](https://plausible.io/), a service that respects user privacy while still letting you see your site traffic and sources.

Once you've set up your Plausible account, just turn it on in your `config.toml`. Neofeed will use your site's URL automatically.

```toml
[params]
plausible = true
```

#### Web Monetization

[Web Monetization](https://webmonetization.org/) is a proposed standard that can let you receive micropayments when visitors browse your site. You'll need to [set up a wallet](https://webmonetization.org/docs/getting-started) that supports the Interledger Protocol (ILP).

Add your wallet's payment pointer to your `config.toml`, for example:

```toml
[params]
paymentPointer = "$wallet.provider.com/myspecialid123"
```

## Contributing

You are absolutely encouraged to contribute to this friendly open source project!

### Values

As a project, Neofeed has these main goals:

1. Make it easy for people to ship a fun and useful website.
2. Make it easy to participate in Neocities to encourage the creation of personal static sites.
3. Demonstrate excellent open source community practices and repository maintenance practices.

Any contribution that works towards these goals is welcome. See [CONTRIBUTING.md](https://github.com/victoriadrake/neofeed-theme/blob/master/.github/CONTRIBUTING.md) for details.
