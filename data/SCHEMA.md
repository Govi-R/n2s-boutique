# Product Data Schema

`products.csv` is the single source of truth for the catalog. The site reads it at build time.
This same file imports into a database later without changes, so treat the column names and
value lists below as fixed.

## Rules that matter

1. **Never change or reuse an `item_code`.** It is the permanent identity of a physical item.
   URLs, saved items, and later database records all key off it.
2. **Use only the allowed values** listed for each column. Free text where a fixed list belongs
   is what breaks filters.
3. **No merged cells, no blank rows, no notes columns.** Add real columns instead.
4. **Multi-value fields use a pipe character** `|` with no spaces around it. Example: `S|M|L`
5. **Never put images in this file or in the repo.** Store image URLs only.

## Columns

| Column | Required | Allowed values / format | Notes |
|---|---|---|---|
| `item_code` | Yes | Letters, numbers, hyphens. e.g. `SAR-0001` | Permanent unique ID. Never reuse. |
| `name` | Yes | Free text, under 70 characters | Shown as the item title |
| `category` | Yes | `women` `men` `girl` `boy` | Drives top-level navigation |
| `subcategory` | Yes | `saree` `chudidhar` `salwar` `top` `other-wear` `jewellery-set` `earrings` `nose-ring` `bangles` `accessory` | Drives garment type filter |
| `occasion` | Yes | `wedding` `festival` `casual` | Multi-value allowed: `wedding\|festival` |
| `color` | Yes | Single word or hyphenated. e.g. `red` `deep-green` `off-white` | Keep the list short and reuse values |
| `fabric` | No | e.g. `silk` `cotton` `kanchipuram-silk` `georgette` `chiffon` `synthetic` | Leave blank for jewellery |
| `sizes` | No | `S` `M` `L` `XL` `XXL` `XXXL` `free-size` | Multi-value: `S\|M\|L`. Blank for accessories |
| `price` | Yes | Number only, no currency symbol. e.g. `4500` | US dollars |
| `quantity` | Yes | Whole number. Use `1` for one-of-a-kind | Drives the hold behaviour later |
| `one_of_a_kind` | Yes | `yes` `no` | `yes` means hiding it on hold |
| `status` | Yes | `available` `sold_out` `hidden` | `hidden` keeps a draft out of the live site |
| `description` | Yes | Free text, 1 to 3 sentences | Also searched by keyword |
| `care_instructions` | No | Free text, short | e.g. `Dry clean only` |
| `image_urls` | Yes | Full URLs, pipe separated | First URL is the main photo |
| `alt_text` | Yes | Free text describing the item | Required for WCAG 2.1 AA |
| `date_added` | Yes | `YYYY-MM-DD` | Drives new arrivals ordering |
| `featured` | No | `yes` `no` | Blank counts as `no`. Shown on homepage |

## Item code convention

A readable prefix makes the catalog easier to manage in a spreadsheet of 1,000 rows.

| Prefix | Type |
|---|---|
| `SAR` | Saree |
| `CHU` | Chudidhar |
| `SAL` | Salwar |
| `TOP` | Top |
| `OTH` | Other wear |
| `JWL` | Jewellery set |
| `EAR` | Earrings |
| `NOS` | Nose ring |
| `BNG` | Bangles |
| `ACC` | Other accessory |

Number sequentially within each prefix: `SAR-0001`, `SAR-0002`, and so on.

## Alt text guidance

Alt text is a WCAG 2.1 AA requirement and appears in image search results, so it earns its keep.
Describe the item as you would to someone who cannot see the photo. Include garment type, colour,
and any distinctive detail. Do not start with "image of" and do not repeat the item code.

Good: `Deep red Kanchipuram silk saree with gold zari border and peacock motif pallu`
Poor: `Saree` or `SAR-0001 image`

## Workflow

1. Photograph items in batches of 20 to 30.
2. Upload photos to the image host and copy the URLs.
3. Add one row per item in the spreadsheet.
4. Export as CSV, overwrite `data/products.csv`, and commit.
5. The site rebuilds automatically.
