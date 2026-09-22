# Project GUIDELINES

Conventions observed in this codebase. Follow the dominant pattern; see
"Known Inconsistencies" before assuming a stray file is the pattern.

## 1. Stack (verified)

- Laravel 13, PHP 8.5, Inertia v3 (server + `@inertiajs/react`), React 19, JSX only (no TSX).
- Tailwind CSS v4, CSS-first: tokens/themes live in `resources/css/app.css` (`@theme`, `:root`, `.dark`).
  There is no `tailwind.config.js`.
- shadcn/ui, style `base-nova`, built on `@base-ui/react` (uses `render` prop, not Radix `asChild`).
  Config: `components.json`; CLI dep `shadcn` in package.json.
- Icons: `lucide-react` only. Tables: `@tanstack/react-table`.
- Vite: `vite.config.js` — input `resources/css/app.css` + `resources/js/app.jsx`,
  alias `@` = `resources/js`, `inertia({ ssr: false })` (SSR off).
- Tests: Pest (`tests/Feature`, `tests/Unit`), sqlite `:memory:` via `phpunit.xml`.
- Served by Laravel Herd: `https://member-management.test`. Never run a dev server manually.

## 2. Directory layout

```
app/
  Enums/                     # string-backed enums, UPPER_SNAKE cases
  Http/Controllers/          # flat + Auth/ subgroup
  Http/Requests/             # StoreX / UpdateX + Auth/
  Http/Middleware/           # HandleInertiaRequests
  Models/
resources/
  css/app.css                # all Tailwind v4 tokens & themes
  js/
    Pages/                   # Inertia pages (route targets)
      <Feature>/             # e.g. Members/, Auth/
        Index.jsx, <Page>.jsx
        components/          # page-specific components
        partials/            # table column defs (Columns.jsx)
    Layouts/                 # Layout.jsx (app shell), GuestLayout.jsx
    components/              # shared, cross-page components
      ui/                    # shadcn/ui primitives — do not hand-write; add via CLI
    hooks/                   # use-mobile.js
    lib/utils.js             # re-exports cn
  views/app.blade.php        # single Inertia root template
database/{migrations,factories,seeders}
routes/web.php               # all routes (no api.php in use)
tests/{Feature,Unit}
```

### Component placement rules

| Kind | Location | Naming |
|---|---|---|
| Route/page component | `resources/js/Pages/<Feature>/<Page>.jsx` | PascalCase; `Index.jsx` for list pages |
| Page-specific (dialog, drawer, cell, form) | `Pages/<Feature>/components/*.jsx` | PascalCase |
| Table column definitions | `Pages/<Feature>/partials/Columns.jsx` | PascalCase |
| Shared across pages | `resources/js/components/*.jsx` | PascalCase (hand-written); kebab-case (shadcn-generated: `data-table.jsx`, `app-sidebar.jsx`, `data-table-pagination.jsx`) |
| shadcn primitives | `resources/js/components/ui/*.jsx` | kebab-case, installed via `npx shadcn add` |
| Layouts | `resources/js/Layouts/*.jsx` | PascalCase |
| Hooks | `resources/js/hooks/*.js` | kebab-case |

Imports: `@/components/ui/...`, `@/components/...` for shared; relative (`../components/...`,
`./partials/Columns`) inside a feature.

## 3. Routing (`routes/web.php`)

- Single file; two middleware groups: `Route::middleware('guest')` for login,
  `Route::middleware('auth')` for everything else. Add new authenticated routes inside the auth group.
- Explicit `Route::get/post/patch` lines, **not** `Route::resource`.
- Named: `login`, `logout`, `dashboard`, `members.index`, `members.store`, `members.update`
  (dot notation `<resource>.<action>`).
- Dashboard is `/` → `DashboardControler@index` → name `dashboard`.

## 4. Controllers

- Extend `App\Http\Controllers\Controller`; no return types on actions (existing style).
- Page actions: `return Inertia::render('<Feature>/<Page>', [...props])`. Props are plain arrays/
  paginators — no Eloquent API Resources anywhere.
- Validation always via FormRequest type-hint (`StoreMemberRequest`, `UpdateMemberRequest`,
  `LoginRequest`), never inline `$request->validate()`.
- Multi-model writes wrapped in `DB::transaction(function () use ($validated) {...})`.
- Relationships created via `Auth::user()->members()->create([...])` or `$model->relation()->create([...])`.
- Success responses: `redirect()->route(...)->with('success', '...')` after create;
  `back()->with('success', '...')` after update.
- Pagination pattern (follow exactly for list pages):
  whitelist `per_page` in `[10,15,25,50,100]` (default 15) → `Model::with('<eager loads>')->
  latest()->paginate($perPage)->withQueryString()` → decorate with `->through(fn ($model) => [...])`
  to expose enums as `['value' => ..., 'label' => ...]`.
- Eager-load deep relations (`memberships.planPrice.plan`); fetch unrelated lookup data
  (e.g. active plans) as a separate prop on the same render.

## 5. Form Requests

- Names: `Store<Member>Request` / `Update<Member>Request` in `app/Http/Requests`,
  feature subfolder only for auth (`Requests/Auth/LoginRequest`).
- `authorize(): bool { return true; }` + `rules(): array` with the standard PHPDoc block.
- Rules as arrays: `['required', 'string', 'min:2', 'max:50']`; uniqueness via
  `Rule::unique('table')->ignore($this->route('member'))`.

## 6. Models

- `protected $fillable = [...]` array; enum/date casting; `HasFactory` trait.
- Relationships: plain methods, no return-type declarations (existing style):
  `hasMany(Membership::class)`, `belongsTo(PlanPrice::class)` etc. Foreign keys snake_case
  (`member_id`, `plan_price_id`).
- Status defaults via `protected $attributes = ['status' => MemberStatus::ACTIVE->value]`.
- Casts: prefer `protected function casts(): array` (used by User, Plan, PlanPrice, Membership).
  Enum casts written as `'status' => MemberStatus::class`, money as `'decimal:2'`.

## 7. Enums (`app/Enums`)

- String-backed, UPPER_SNAKE cases, lowercase values (`ACTIVE = 'active'`).
- Where the UI needs text, add `label()` returning `match ($this) {...}` (see `MemberStatus`).
- Existing: `MemberStatus`, `BillingPeriod`, `UserRole`, `UserStatus`.

## 8. Migrations, factories, seeders

- Anonymous `return new class extends Migration`; `up()/down()` with standard PHPDoc.
- FKs: `$table->foreignIdFor(Member::class)->constrained()->cascadeOnDelete();`
  (dominant style; `plan_prices` uses `foreignId('plan_id')` — same semantics).
- Status columns: `string` with `->default('active')` (not enum column).
- Indexes added after columns: `$table->index(['member_id', 'status']);`
- Factories: `protected $model = X::class;` + `definition()` using `fake()->...`.
- Seeders: one per model, called in dependency order from `DatabaseSeeder::run()`
  (`UserSeeder, PlanSeeder, PlanPriceSeeder, MemberSeeder, MembershipSeeder`).

## 9. Inertia wiring

- Root template `resources/views/app.blade.php` (always `class="dark"`), bootstrapped by
  `resources/js/app.jsx`.
- Every page gets `Layout` (sidebar shell) **by default**; a page opts out by assigning
  `Page.layout = (page) => <GuestLayout>{page}</GuestLayout>` (see `Auth/Login.jsx`).
- `HandleInertiaRequests` is appended to the web group in `bootstrap/app.php`; its `share()`
  is currently empty — flash messages are **not** shared with the client yet.
- Client navigates with literal URL strings (`post('/members')`, `` patch(`/members/${id}`)``,
  `router.get(path, ...)`). No Ziggy / `route()` helper exists — do not introduce one.

## 10. Page & form patterns (React)

- Page shape: `const Page = ({ prop1, prop2 }) => {...}; export default Page` (or
  `export default function`); no prop-type files.
- Forms: `const { data, setData, post|patch, processing, errors, reset } = useForm({...})`;
  `handleSubmit` calls `e.preventDefault()` then submits; `disabled={processing}`;
  submit label swaps (`processing ? 'Saving...' : 'Save Member'`); `onSuccess` → `reset()` +
  close dialog. Edit forms use `patch(..., { preserveScroll: true, onSuccess })` and gate the
  button with `isDirty`.
- Controlled overlays: parent owns `open`/`onOpenChange` (Dialog, Drawer, AlertDialog) and
  passes them down; mode switching via a `mode`/`onModeChange` prop pair (`view` | `edit`).
- Repeated field helper pattern exists (`Field` + `bind(name)` in `MemberEditForm`) — reuse for
  longer forms.
- Destructive/irreversible actions get an `AlertDialog` confirmation (see `LogoutButton`).
- Status display: server sends `status: { value, label }` → map through
  `StatusVariant[value]` → `<Badge variant={...}>{label}</Badge>` (`Members/components/StatusVariants.jsx`).
- Dates: `new Date(x).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })`;
  missing values render `"—"`.
- Base UI composition: `render={<Button ... />}` on triggers (`TooltipTrigger`,
  `DropdownMenuTrigger`, `AlertDialogTrigger`, `SidebarMenuButton`).
- Wrap the app in `ErrorBoundary` (already applied in `app.jsx`).

## 11. Tables

- `DataTable` (shared) takes `columns` + `data`; columns are TanStack column-def arrays placed in
  `Pages/<Feature>/partials/Columns.jsx`, custom rendering via `cell: ({ row }) => ...`
  reading `row.original`.
- Pagination uses Laravel's paginator object directly: `<DataTablePagination meta={members} />`;
  it navigates with `router.get(meta.path, { page, per_page }, { preserveState, preserveScroll })`.
  Rows-per-page options are `[10, 15, 25, 50, 100]` — keep backend whitelist and this list in sync.

## 12. Styling (Tailwind v4)

- Use semantic tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-muted`,
  `bg-primary text-primary-foreground`, `border`, `text-destructive`. Theme is dark-only (`.dark`
  on `<html>`).
- New shadcn components: `npx shadcn add <component>` (respects `components.json`); never edit
  `resources/css/app.css` theme blocks for one-off styling.
- Badge variants: `default | success | secondary | destructive | outline | ghost | link`
  (`success` added in `ui/badge.jsx`).
- Spacing/layout idioms: page wrapper `px-6`, content `Header` + `w-full max-w-6xl` table block,
  `space-y-4` forms, `size-4` / `h-4 w-4` icons.

## 13. Adding a new feature (checklist)

1. Migration (`php artisan make:migration`) → Model (+`$fillable`, `casts()`, `HasFactory`, relations).
2. Factory + Seeder; register seeder in `DatabaseSeeder`.
3. Enum(s) in `app/Enums` if the feature has statuses/categories.
4. `Store<X>Request` / `Update<X>Request`.
5. Controller in `app/Http/Controllers`; `index` follows the pagination + `->through()` pattern;
   writes in `DB::transaction`; redirect with `->with('success', ...)`.
6. Routes in `routes/web.php` inside the `auth` group, named `<feature>.<action>`.
7. Page in `resources/js/Pages/<Feature>/Index.jsx` (+`components/`, `partials/Columns.jsx`).
8. Add sidebar link in `components/app-sidebar.jsx` (`render={<Link href="..."/>}`, `isActive`
   from `usePage().url`).
9. Pest feature test in `tests/Feature` (`php artisan make:test --pest <Name>`).
10. After PHP edits: `vendor/bin/pint --dirty --format agent`. Frontend changes need
    `npm run build` (or `npm run dev`) to appear.

## 14. Testing

- Pest, feature-first: `tests/Feature/*.php` with `test('...', function (): void {...})`.
- `tests/Pest.php` binds `Tests\TestCase` to `Feature`; `RefreshDatabase` is currently commented
  out — enable it per-file (`uses(RefreshDatabase::class)`) when touching the DB.
- Use factories for model setup. Run narrow: `php artisan test --compact --filter=...`.

## 15. Commands

- `composer run dev` (serves + queue + vite), `npm run build`, `php artisan test --compact`,
  `vendor/bin/pint --dirty --format agent`, `php artisan route:list`, `php artisan migrate`.

---

## Known inconsistencies (informational — do not copy these into new code)

1. `DashboardControler` is misspelled (one `l`); referenced by `routes/web.php`.
2. `Member` uses the `protected $casts` property; all other models use `casts(): array`.
3. `MembershipController` exists but is empty and has no routes.
4. `PlanPrice` is missing `HasFactory`; no `PlanPriceFactory` exists.
5. Stale after `remove_price_and_duration_days_from_plans_table`: `Plan` `$fillable` still lists
   `price`/`duration_days`; `PlanFactory` still defines them.
6. `MembershipFactory` writes `plan_id` but the table column is `plan_price_id` (broken).
7. `MembershipSeeder` uses `$plan->duration_days` (dropped) and passes a `Plan` id as
   `plan_price_id`; it also duplicates `MemberSeeder`'s membership creation.
8. `UserSeeder` reads `env()` directly instead of `config()`.
9. Frontend references routes that don't exist: `` router.patch(`/members/${id}/toggle-suspend`) ``
   (`ActionsCell.jsx`) and sidebar link `/settings` (`app-sidebar.jsx`). The delete AlertDialog
   has no confirm action wired.
10. `StatusVariant` map omits `expiring` (exists in `MemberStatus`).
11. Store vs Update rules drift: `first_name/max:50 + required address/phone regex` (store) vs
    `max:100 + nullable` (update).
12. `members.date_of_birth` and `members.address` are `text` columns (dob should be `date`).
13. Flash `success` is set by controllers but never shared in `HandleInertiaRequests::share()`
    nor read anywhere in React — currently a no-op on the client.
14. Error display is split: `InputError` component (Login) vs inline
    `text-sm text-red-500` (`AddMemberDialog`) vs `text-red-600` (`MemberEditForm`).
15. Mixed file naming in `components/`: PascalCase for hand-written, kebab-case for
    shadcn-derived (`data-table.jsx`, `app-sidebar.jsx`).
16. `phpunit.xml`/`Pest.php` ship only `ExampleTest`s; `RefreshDatabase` disabled globally.
17. `resources/js/lib/utils.js` re-exports `cn` from the standalone `cn` package rather than
    defining `twMerge(clsx(...))`.
