# Setup Guide

Written assuming you have never used a code editor, a terminal, or GitHub. Work
through it in order. Nothing here can break anything permanently, and you can
stop at the end of any step and come back later.

Total time for steps 1 to 5 is about an hour. Step 6 onwards is the catalog work,
which is ongoing.

---

## Before you start: what these tools are

You need four things installed or signed up for. Here is what each one actually does,
so the instructions make sense rather than being magic words to copy.

| Thing | What it is | Why you need it |
|---|---|---|
| **Node.js** | A program that runs JavaScript on your computer | Turns this project's code into a website |
| **A code editor** | A text editor built for code | To open and edit the project files |
| **The terminal** | A window where you type commands | To run the two commands that build the site |
| **A GitHub account** | Free website that stores code and can host sites | Stores your project and publishes the site |

The terminal is the one that intimidates people most. It is just a place to type
instructions instead of clicking. You will use exactly three commands in this
whole guide.

---

## Step 1: Install Node.js

1. Go to **nodejs.org**
2. Download the version labelled **LTS** (long term support). Do not pick "Current".
3. Run the installer and accept all the defaults.
4. Restart your computer. This matters, because it lets your terminal find Node.

**Check it worked.** Open your terminal:

- **Windows:** press the Start key, type `powershell`, press Enter
- **Mac:** press Cmd+Space, type `terminal`, press Enter

Type this and press Enter:

```
node --version
```

You should see something like `v20.11.0`. Any number starting with 18 or higher is
fine. If you get "command not found", Node did not install correctly, or you did
not restart.

---

## Step 2: Install a code editor

1. Go to **code.visualstudio.com** and download Visual Studio Code (free)
2. Install it with the default options

You will mostly use it to edit `lib/site-config.js` and to look at files. You do
not need to learn it properly.

---

## Step 3: Get the project onto your computer

1. Unzip the project folder somewhere you will find it again. Your Documents
   folder is fine. Avoid Desktop if it is already cluttered.
2. Open Visual Studio Code
3. Go to **File, then Open Folder**, and choose the `n2s-boutique` folder
4. You should see the file list on the left: `app`, `components`, `data`, `lib`,
   and so on

Now open a terminal inside the editor: **Terminal, then New Terminal** from the
top menu. A panel opens at the bottom, already pointed at your project folder.
This saves you having to navigate there manually.

---

## Step 4: Run the site on your own computer

In that terminal panel, type this and press Enter:

```
npm install
```

This downloads the building blocks the project needs. It takes one to three
minutes and prints a lot of text. Some warnings are normal. You only ever need
to run this once, or again if you change `package.json`.

Then type:

```
npm run dev
```

You should see a message with a web address, usually `http://localhost:3000`.
Hold Ctrl (Cmd on Mac) and click it, or paste it into your browser.

**The site should now be running with the eight sample products.** Click around.
Try the filters, add something to the cart, save something with the heart icon.

While `npm run dev` is running, that terminal is busy. Any edit you save appears
in the browser within a second or two. To stop it, click the terminal and press
Ctrl+C.

> If you see an error mentioning a port already in use, something else is on port
> 3000. Stop it, or the message will tell you it used 3001 instead. Either is fine.

---

## Step 5: Fill in your details

Open `lib/site-config.js` in the editor. Every value marked `REPLACE_ME` needs
your real information. Keep the quotation marks. Replace only what is between them.

```js
phone: "REPLACE_ME",      →      phone: "(469) 555-0123",
```

You need:

- **phone** and **email** for the contact page
- **instagram** and **facebook** as full links starting with `https://`
- **whatsappGroup** as the group invite link
- **formspreeId** from step 5b below
- **googleAnalyticsId** from step 5c, or leave the empty quotes for now

To hide a link entirely, put empty quotes: `facebook: "",`

### Step 5b: Connect the order form

The order form needs somewhere to send email. GitHub Pages cannot send email
itself, so a free service called Formspree does it.

1. Go to **formspree.io** and sign up free
2. Create a new form. Name it something like "N2S order requests"
3. Set the notification email to the address where you want orders to arrive
4. Formspree shows you an endpoint like `https://formspree.io/f/xabcdefg`
5. Copy only the last part, `xabcdefg`, into `formspreeId` in the config file

**Test it before you launch.** Add an item to the cart on your local site, submit
the order form with your own details, and confirm the email arrives. If the form
is not connected you will see an on-screen message saying so, which is the code
telling you the ID is still `REPLACE_ME`.

Formspree's free plan has a monthly submission limit. It is generous for your
expected volume, but check the current limit on their site so you are not
surprised.

### Step 5c: Set up Google Analytics

1. Go to **analytics.google.com** and create an account, then a property for
   n2sboutique.com
2. Choose Web as the platform
3. It gives you a measurement ID that looks like `G-ABC1234XYZ`
4. Paste it into `googleAnalyticsId`

Nothing is tracked until you add this ID, so you can skip it and come back.

---

## Step 6: Set up image hosting

**Do this before you photograph anything.** Read the warning below properly,
because it is the one mistake in this project that is genuinely painful to undo.

Never put image files in the project folder or on GitHub. A thousand items with
three or four photos each is several thousand files. Git, the system GitHub uses,
keeps every version of every file forever, so the project would balloon and never
shrink again even after you deleted the images.

Instead, images live on an image host and the project stores only their web
addresses.

1. Go to **cloudinary.com** and sign up free
2. In the Media Library, create a folder called `n2s`
3. Upload a test photograph
4. Click it and copy its URL. It looks like
   `https://res.cloudinary.com/your-account/image/upload/v1234/n2s/test.jpg`
5. Paste that URL into the `image_urls` column of a row in `data/products.csv`,
   replacing the `REPLACE-WITH-IMAGE-HOST` placeholder
6. Refresh your local site and confirm the photo appears

Check Cloudinary's current free tier limits on their pricing page. For a catalog
of this size with local traffic it is normally comfortable, but confirm rather
than assume.

**Naming photos consistently saves you hours.** Use the item code:
`sar-0001-a.jpg`, `sar-0001-b.jpg`, `sar-0002-a.jpg`. When you have 3,000 images
you will be very glad you did this from the start.

---

## Step 7: Add your products

`data/products.csv` is the whole catalog. The website reads it when it builds.

1. Open it in Excel or Google Sheets, not in the code editor. It is a spreadsheet.
2. Read `data/SCHEMA.md` first. It lists every column and the exact values
   allowed. The filters on the site only work if you stick to those values.
3. Delete the eight sample rows once you have real items in.
4. When saving, choose **CSV** format, not Excel format. Excel will warn you
   about losing formatting. That is fine, there is no formatting to lose.
5. Save it over `data/products.csv`.
6. Refresh your local site to see the changes.

### The three rules that matter most

1. **Never change or reuse an `item_code`.** It becomes part of the web address,
   so changing it breaks any link a customer bookmarked or shared, and it is what
   your future database will key on.
2. **Use only the allowed values from SCHEMA.md.** Typing "Red" in one row and
   "red" in another creates two separate filter options.
3. **Fill in `alt_text` for every item.** It describes the photo for people using
   a screen reader, it is a WCAG 2.1 AA requirement from your specification, and
   it helps you appear in Google image results. The build prints a warning listing
   any items missing it.

### A realistic workflow

Photograph 20 to 30 items in one session, same spot, same light, same backdrop.
Upload that batch to Cloudinary. Add those rows to the spreadsheet. Save, check
locally, publish. Repeat.

Consistency beats quality here. A phone camera by a window with the same plain
sheet behind every item looks more professional than a mix of good photos taken
in different rooms.

**Launch at 100 items.** Do not wait for 1,000. That is the difference between
launching next month and launching next year.

---

## Step 8: Put the project on GitHub

1. Go to **github.com** and sign up free
2. Click the **+** at the top right, then **New repository**
3. Name it `n2s-boutique`
4. Choose **Public**. Private repositories cannot use GitHub Pages on the free plan.
5. Do not tick any of the "add a file" options
6. Click **Create repository**

GitHub then shows you a page of commands. Use the section headed "push an
existing repository from the command line". In your editor's terminal, run the
commands below one at a time, replacing `YOUR-USERNAME` with your GitHub username:

```
git init
git add .
git commit -m "First version of the N2S Boutique site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/n2s-boutique.git
git push -u origin main
```

You will be asked to sign in. GitHub no longer accepts your normal password here.
When prompted for a password, you need a **personal access token** instead:
GitHub, then Settings, then Developer settings, then Personal access tokens, then
Tokens (classic), then Generate new token, and tick the `repo` scope. Copy the
token and paste it as the password. Save it somewhere safe, because GitHub will
not show it again.

> The `.gitignore` file in the project already stops `node_modules` from being
> uploaded. That folder is enormous and does not belong on GitHub.

---

## Step 9: Turn on GitHub Pages

1. In your repository on GitHub, click **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, choose **GitHub Actions**

That is all. The workflow file already in the project takes over from here.

Click the **Actions** tab. You should see a run in progress. It takes two to
three minutes. A green tick means the site is live at
`https://YOUR-USERNAME.github.io/n2s-boutique/`.

**From now on, publishing is automatic.** Every time you push a change, the site
rebuilds and redeploys itself. Your update routine becomes:

```
git add .
git commit -m "Added 25 new sarees"
git push
```

A red X in the Actions tab means the build failed. Click into the run to see the
error. The most common cause by far is a malformed CSV, usually a stray comma or
a missing quotation mark in a description.

---

## Step 10: Point n2sboutique.com at the new site

Do this last, once you are happy with the site and have at least 100 items live.
Your existing Google Sites page stays up until you make this change, so there is
no rush and no gap.

1. In your GitHub repository, go to **Settings, then Pages**
2. Under **Custom domain**, enter `www.n2sboutique.com` and save
3. Log in to **Ionos** and find the DNS settings for n2sboutique.com
4. Add a **CNAME** record: name `www`, value `YOUR-USERNAME.github.io`
5. For the bare domain, add four **A** records pointing `@` at GitHub's Pages
   addresses. GitHub lists the current IP addresses in its own documentation
   under "Managing a custom domain for your GitHub Pages site". Use that page
   rather than any address you find in a blog post, because they have changed
   before.
6. Back in GitHub Pages settings, tick **Enforce HTTPS** once it becomes available

DNS changes can take anywhere from a few minutes to 48 hours. If the site does
not appear immediately, wait before changing anything else. Changing DNS records
repeatedly while waiting makes diagnosis much harder.

The `public/CNAME` file in the project already contains `www.n2sboutique.com`,
which stops GitHub from forgetting your custom domain on each deploy.

---

## Before you tell anyone about the site

- [ ] All `REPLACE_ME` values in `lib/site-config.js` are filled in
- [ ] Order form tested end to end, and the email arrived
- [ ] At least 100 items live with photos, prices, sizes and alt text
- [ ] Every page checked on an actual phone, not just a narrow browser window
- [ ] Cart, save for later, filters and search all tried on that phone
- [ ] Contact details correct on the contact page
- [ ] Policy pages reviewed and reworded to match what you actually do
- [ ] Privacy policy checked by someone qualified (see the warning below)
- [ ] Pickup address does not appear anywhere on the site
- [ ] Google Analytics recording visits
- [ ] Google Business Profile created for local search

### Two things to sort out separately

The policy and privacy pages contain **draft wording only**. It has not been
reviewed by a lawyer and is not legal advice. Have it checked against a proper
template or by an attorney before you publish, particularly the privacy policy,
since you are collecting names, phone numbers and email addresses.

There are also two business questions worth resolving before you launch a
commercial website, both flagged in the specification: **Texas sales tax** on
apparel, and whether your **HOA or city** restricts home-based retail with
customer pickup. Neither is something I can answer for you. Speak to an
accountant and check your HOA documents.

---

## Common problems

**"npm: command not found"**
Node.js is not installed, or you did not restart after installing it. Redo step 1.

**The site builds but no images appear**
The `image_urls` column still contains `REPLACE-WITH-IMAGE-HOST` placeholders, or
the URLs are wrong. Paste one directly into a browser to test it.

**A filter option is missing, or appears twice**
Your CSV uses a value that is not in SCHEMA.md, or the same value with different
capitalisation or spelling. The filter menus are built from whatever is actually
in the file.

**The order form does nothing**
`formspreeId` is still `REPLACE_ME`. You will see an on-screen message saying so.

**Build fails after a spreadsheet edit**
Almost always the CSV. A description containing a comma must be wrapped in
quotation marks. Excel usually handles this, but check the row you last edited.

**Cart empties when I switch browsers**
That is expected. The cart lives in one browser on one device, which is why
customers submit their contact details with the order rather than logging in.

---

## When you outgrow this

This version deliberately has no admin panel, no inventory hold, and no order
status tracking, because those need a database and GitHub Pages cannot run one.
Your admin panel for now is the spreadsheet, and holds are manual.

Three decisions in this project protect the upgrade path, and you should not
change them:

1. Images are hosted externally and referenced by URL
2. `products.csv` uses fixed column names and values so it imports into a
   database unchanged
3. `item_code` is permanent

When you are ready, the upgrade is: remove the `output: "export"` line from
`next.config.mjs`, add a database, add API routes and an admin panel, and deploy
to a host that runs server code. Every page and component in this project carries
over.

One honest note. If in six months you find yourself wanting the admin panel and
holds, WooCommerce would give you all of it out of the box. Switching then is not
a failure, and your product data and images would move across cleanly. Building
version 2 yourself is worth it if you want to build it. It is not worth it just
to avoid a monthly hosting fee.
