# BestieBoys cPanel migration support package

Branch: `cpanel-migration-20260925`

This directory is **not** the authoritative BestieBoys live Site source. It contains only the migration support files needed when the exact current live ChatGPT Site front-end is copied to cPanel.

## Verified current defect and repair

At a 390×844 mobile viewport the live enquiry dialog computed its mobile position as top/left 0, but Tailwind's individual CSS `translate` property remained `-50% -50%`. The dialog therefore rendered half a viewport up and left.

A non-persistent browser test against the current live site passed with exactly:

```css
@media (max-width: 640px) {
  .enquiry-dialog {
    translate: none !important;
  }
}
```

After this override the dialog measured 390×844 at x=0/y=0; Close was visible; all fields and the submit button were reachable; body scroll stayed locked; modal scrolling and focus order passed.

## Deployment target

Previously verified staging document root:

```
~/public_html/BestieBoys-staging
```

Previously verified account home:

```
/data/bestieboys
```

Do not promote the old GitHub preview site as the live source. Copy the exact current ChatGPT Site front-end first, then add these support files.

## Files

- `mobile-enquiry-fix.css` — verified mobile modal fix.
- `api/custom-enquiries.php` — same-origin cPanel/PHP enquiry receiver.
- `.htaccess` — HTTPS, clean-route rewrites, and `/api/custom-enquiries` routing.

## Integration

1. Place the exact current live front-end in the staging document root.
2. Copy `mobile-enquiry-fix.css` into that document root.
3. Add this after the existing main stylesheet in the migrated HTML:
   `<link rel="stylesheet" href="/mobile-enquiry-fix.css">`
4. Copy `api/custom-enquiries.php` to `api/custom-enquiries.php`.
5. Copy this package's `.htaccess` to the staging document root, merging only if the exact migrated site already has required rules.
6. Ensure `/data/bestieboys/bestieboys-private` is writable by the cPanel account and is not web-accessible.

## Backend behavior

The PHP endpoint preserves the public client contract:

- `OPTIONS` → 204
- `POST /api/custom-enquiries`
- required: `customerName`, `email`, `petName`, `petPhoto`
- accepted images: JPEG, PNG, WebP, verified by server MIME and image parsing
- optional fields preserved: `website`, `genreStyle`, `garment`, `size`, `colour`, `notes`
- returns JSON with a truthy `enquiryId`
- stores enquiry JSON and pet photo outside the public document root

No automatic notification email has been added because no notification destination has been verified or approved.

## Required staging QA before DNS cutover

- exact 390×844 mobile modal
- real iPhone/Safari interaction
- Close control
- every form field
- keyboard/focus and modal scrolling
- PNG/JPEG/WebP upload
- controlled test submission returns an enquiry ID
- stored JSON + photo readback
- desktop regression
- `/styles`, `/merch`, `/arcade` clean routes
- HTTP → HTTPS
- no broken images or horizontal overflow

Live DNS remains HOLD until the cPanel staging build passes.
