<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- AI SEO priorities are generated server-side from live Search Console data and cached one row per day in `seo_priorities`; the admin panel reads the cache unless the admin regenerates — avoids repeat AI cost.
- Vehicle image resolution preserves Lovable Assets paths alongside existing storage paths and HTTPS URLs — uploaded fleet photos must remain usable in public and admin galleries.
- Public fleet cards open on a studio 360° view (`public/spin360`, `vehicle360Frames`) only for units whose angle set was checked against that unit's own real photos (same colour, wheels, trim) with plates blurred; the real photos stay one tap away under the photos toggle. Never show a 360° set matched only by model name, and never use the old `public/spin/<key>/NN.jpg` sequences (they change vehicle identity mid-turn). Preserve original editable uploads separately from public plate-obscured display.
- Daily blog articles are AI-written by a scheduled call to `/api/public/hooks/blog-daily`, capped per day in `blog_auto_posts` and merged with static posts in `src/lib/blog.ts` — the cap keeps repeated or stray calls from adding cost.
