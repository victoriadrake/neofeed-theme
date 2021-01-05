# ![Twinkling star](/images/littlestar.gif) Neofeed ![Twinkling star](/images/littlestar.gif)

(っ◔◡◔)っ A personal timeline for Neocities and GitHub Pages.

- Like Twitter but it doesn't suck
- Like Geocities except it exists

✨ Neofeed is a beginner-friendly starter site to learn to use Hugo and generate awesome static websites with continuous delivery. This enriched Hugo theme helps you create a plain HTML static website. You can deploy to Neocities and GitHub Pages with continuous deployment workflows out of the box!

🖌 Use CSS skins to switch it up and make it your own. Feeling brave? All the source code is at your fingertips. Go nuts!

## Screenshots

You can make your Neofeed look like _anything you can imagine._ Here are a few options for you to use, change, or extend right out of the box.

![Neofeed with "minimal" CSS skin](/images/minimal.png)
![Neofeed with "macintosh" CSS skin](/images/macintosh.png)
![Neofeed with "cloudy-day" CSS skin](/images/cloudy-day-dark.png)

## The General Idea

Neofeed is an enriched Hugo theme. It gives you a fun starting point for creating your own personal feed on your own personal website! Customize as little or as much as you want.

Starting from scratch? Check out the [Neocities Tutorials](https://neocities.org/tutorials).

You can edit your `config.toml` to customize basic website things, like your site title, your name, and some "about me" text. That's all you need to deploy a great-looking Neofeed.

You can choose from pre-made CSS skins with automatic light and dark modes. Create your own to give your Neofeed personality, or share a CSS skin you made with a pull request to this repository!

Day-to-day, you can deploy your own personal feed updates to your Neocities website as well as GitHub Pages with two commands.

```sh
make entry
# ---
# title: 7c483a16-7931-43d7-9417-80124a06a4fa
# date: 2021-01-03T07:03:33 
# categories: 
# tags: 
# ---
# Hello world! Let's take back the timeline.
make ship
```

A special [self-documenting Makefile](https://victoria.dev/blog/how-to-create-a-self-documenting-makefile/) makes this possible.

## Git Started

If you have [Git](https://git-scm.com/) and [Make](https://pubs.opengroup.org/onlinepubs/9699919799/) or [GNU Make](https://www.gnu.org/software/make/), Neofeed can be set up and deployed without installing any additional dependencies.

1. Fork the repository.
2. Get your Neocities API key by going to:

    `https://neocities.org/settings/{{your-sitename}}#api_key`
3. Set up your Neocities API key as a [repository secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) called `NEOCITIES_API_TOKEN`.

Then run:

```sh
git clone https://github.com/<your username>/neofeed.git
cd neofeed
```

3. Edit the `config.toml` file to name your site and choose options.
4. Create your first entry and ship it!

```sh
make entry
# Write something clever in your $EDITOR
make ship
```

This will build your Neofeed and deploy it to Neocities using the [included GitHub Actions workflow](.github/workflows/build.yaml)!

Your site can also be served by Github Pages. Make it so by [configuring the publishing source](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) to be your `docs/` directory.

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

Once you've set up your Plausible site, just turn it on in your `config.toml`. Neofeed will use your site's URL automatically.

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

Any contribution that works towards these goals is welcome. See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.
