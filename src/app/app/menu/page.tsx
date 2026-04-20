"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icon";
import { FloatingOrbs, MotionItem, MotionShell, MotionStack } from "@/components/motion";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { useWorkspaceSummary } from "@/hooks/use-workspace-summary";

type MenuItemDraft = {
  id: string;
  name: string;
  price: string;
  visible: boolean;
  featured: boolean;
};

type MenuCategoryDraft = {
  id: string;
  name: string;
  visible: boolean;
  accent: number;
  items: MenuItemDraft[];
};

type MenuCatalogDraft = {
  categories: MenuCategoryDraft[];
};

type CategoryFormState = {
  id: string;
  name: string;
  visible: boolean;
  accent: number;
};

type ItemFormState = {
  id: string;
  categoryId: string;
  name: string;
  price: string;
  visible: boolean;
  featured: boolean;
};

const accentColors = ["#111111", "#9d6b32", "#2d6b6f", "#6e4a92", "#b14d57", "#4f7c4f"];

function createId() {
  return crypto.randomUUID();
}

function emptyCatalog(): MenuCatalogDraft {
  return { categories: [] };
}

function countItems(categories: MenuCategoryDraft[]) {
  return categories.reduce((total, category) => total + category.items.length, 0);
}

function MenuCard({
  icon,
  title,
  value,
}: {
  icon: IconName;
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
          <Icon name={icon} className="size-4" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">{title}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function CategoryFormDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: CategoryFormState | null;
  onSave: (value: CategoryFormState) => void;
}) {
  const [name, setName] = useState(() => initial?.name ?? "");
  const [visible, setVisible] = useState(() => initial?.visible ?? true);
  const [accent, setAccent] = useState(() => initial?.accent ?? 0);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-black/10 bg-[var(--surface-strong)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="grid" className="size-3.5" />
              Category
            </div>
            <Dialog.Close asChild>
              <button className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-black/45">
                <Icon name="x" className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-4 grid gap-3">
            <label className="flex h-12 items-center gap-2 rounded-full border border-black/12 bg-black/[0.02] px-4">
              <Icon name="edit" className="size-4 text-black/35" />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/28"
              />
            </label>

            <div className="flex items-center justify-between rounded-[1.35rem] border border-black/8 bg-black/[0.02] px-4 py-3">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon name="eye" className="size-4" />
                </span>
                <div className="text-sm font-medium text-black/72">Visible</div>
              </div>
              <Switch.Root
                checked={visible}
                onCheckedChange={setVisible}
                className="relative h-7 w-12 rounded-full border border-black/10 bg-white data-[state=checked]:bg-black"
              >
                <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-black shadow-sm transition-transform will-change-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-white" />
              </Switch.Root>
            </div>

            <div className="flex flex-wrap gap-2">
              {accentColors.map((color, index) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAccent(index)}
                  className={[
                    "size-11 rounded-full border transition",
                    accent === index ? "border-black/60 shadow-[0_0_0_4px_rgba(0,0,0,0.05)]" : "border-black/10",
                  ].join(" ")}
                  style={{ background: color }}
                  aria-label={`Accent ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black">
                <Icon name="x" className="size-4" />
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => {
                if (!name.trim()) return;
                onSave({
                  id: initial?.id ?? "",
                  name: name.trim(),
                  visible,
                  accent,
                });
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white"
            >
              <Icon name="check" className="size-4" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ItemFormDialog({
  open,
  onOpenChange,
  initial,
  categoryId,
  categories,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: ItemFormState | null;
  categoryId: string;
  categories: MenuCategoryDraft[];
  onSave: (value: ItemFormState) => void;
}) {
  const [name, setName] = useState(() => initial?.name ?? "");
  const [price, setPrice] = useState(() => initial?.price ?? "");
  const [visible, setVisible] = useState(() => initial?.visible ?? true);
  const [featured, setFeatured] = useState(() => initial?.featured ?? false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => initial?.categoryId || categoryId);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-black/10 bg-[var(--surface-strong)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="menu" className="size-3.5" />
              Item
            </div>
            <Dialog.Close asChild>
              <button className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-black/45">
                <Icon name="x" className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-4 grid gap-3">
            <label className="flex h-12 items-center gap-2 rounded-full border border-black/12 bg-black/[0.02] px-4">
              <Icon name="edit" className="size-4 text-black/35" />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/28"
              />
            </label>

            <label className="flex h-12 items-center gap-2 rounded-full border border-black/12 bg-black/[0.02] px-4">
              <Icon name="chart" className="size-4 text-black/35" />
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0"
                inputMode="decimal"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/28"
              />
            </label>

            <div className="grid gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={[
                    "flex items-center justify-between rounded-[1.35rem] border px-4 py-3 text-sm transition",
                    selectedCategoryId === category.id
                      ? "border-black/50 bg-black text-white"
                      : "border-black/8 bg-black/[0.02] text-black/72",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon name="grid" className="size-4" />
                    {category.name || "—"}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                    {category.items.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-[1.35rem] border border-black/8 bg-black/[0.02] px-4 py-3">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                    <Icon name="eye" className="size-4" />
                  </span>
                  <div className="text-sm font-medium text-black/72">Visible</div>
                </div>
                <Switch.Root
                  checked={visible}
                  onCheckedChange={setVisible}
                  className="relative h-7 w-12 rounded-full border border-black/10 bg-white data-[state=checked]:bg-black"
                >
                  <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-black shadow-sm transition-transform will-change-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-white" />
                </Switch.Root>
              </div>

              <div className="flex items-center justify-between rounded-[1.35rem] border border-black/8 bg-black/[0.02] px-4 py-3">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                    <Icon name="spark" className="size-4" />
                  </span>
                  <div className="text-sm font-medium text-black/72">Featured</div>
                </div>
                <Switch.Root
                  checked={featured}
                  onCheckedChange={setFeatured}
                  className="relative h-7 w-12 rounded-full border border-black/10 bg-white data-[state=checked]:bg-black"
                >
                  <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-black shadow-sm transition-transform will-change-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-white" />
                </Switch.Root>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black">
                <Icon name="x" className="size-4" />
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => {
                if (!name.trim() || !selectedCategoryId) return;
                onSave({
                  id: initial?.id ?? "",
                  categoryId: selectedCategoryId,
                  name: name.trim(),
                  price,
                  visible,
                  featured,
                });
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white"
            >
              <Icon name="check" className="size-4" />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Page() {
  const { growth } = useWorkspaceSummary();
  const [prefs] = usePersistedState("witly-ui-prefs", { compact: false, motion: true, accent: 0 });
  const [catalog, setCatalog] = usePersistedState<MenuCatalogDraft>("witly-menu-catalog", emptyCatalog());
  const [mode, setMode] = useState("board");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryFormState | null>(null);
  const [editingItem, setEditingItem] = useState<ItemFormState | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const activeCategory =
    catalog.categories.find((category) => category.id === selectedCategoryId) ?? catalog.categories[0] ?? null;

  function saveCategory(form: CategoryFormState) {
    setCatalog((prev) => {
      const id = form.id || createId();
      const category: MenuCategoryDraft = {
        id,
        name: form.name,
        visible: form.visible,
        accent: form.accent,
        items: prev.categories.find((categoryRow) => categoryRow.id === id)?.items ?? [],
      };
      const categories = prev.categories.some((categoryRow) => categoryRow.id === id)
        ? prev.categories.map((categoryRow) => (categoryRow.id === id ? category : categoryRow))
        : [...prev.categories, category];
      return { categories };
    });
    setCategoryDialogOpen(false);
    setEditingCategory(null);
  }

  function saveItem(form: ItemFormState) {
    setCatalog((prev) => {
      const nextCategories = prev.categories.map((category) => {
        if (category.id !== form.categoryId) return category;
        const id = form.id || createId();
        const item: MenuItemDraft = {
          id,
          name: form.name,
          price: form.price,
          visible: form.visible,
          featured: form.featured,
        };
        const items = category.items.some((row) => row.id === id)
          ? category.items.map((row) => (row.id === id ? item : row))
          : [...category.items, item];
        return { ...category, items };
      });
      return { categories: nextCategories };
    });
    setItemDialogOpen(false);
    setEditingItem(null);
  }

  function toggleCategoryVisibility(id: string) {
    setCatalog((prev) => ({
      categories: prev.categories.map((category) =>
        category.id === id ? { ...category, visible: !category.visible } : category,
      ),
    }));
  }

  function deleteCategory(id: string) {
    setCatalog((prev) => ({
      categories: prev.categories.filter((category) => category.id !== id),
    }));
  }

  function toggleItemVisibility(categoryId: string, itemId: string) {
    setCatalog((prev) => ({
      categories: prev.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, visible: !item.visible } : item,
              ),
            },
      ),
    }));
  }

  function deleteItem(categoryId: string, itemId: string) {
    setCatalog((prev) => ({
      categories: prev.categories.map((category) =>
        category.id !== categoryId
          ? category
          : { ...category, items: category.items.filter((item) => item.id !== itemId) },
      ),
    }));
  }

  function duplicateItem(categoryId: string, item: MenuItemDraft) {
    setCatalog((prev) => ({
      categories: prev.categories.map((category) => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          items: [
            ...category.items,
            {
              ...item,
              id: createId(),
              name: item.name ? `${item.name}` : "",
            },
          ],
        };
      }),
    }));
  }

  const visibleItems = activeCategory?.items ?? [];
  const allItems = catalog.categories.flatMap((category) =>
    category.items.map((item) => ({ ...item, categoryId: category.id, categoryName: category.name })),
  );

  return (
    <main className={prefs.compact ? "flex flex-col gap-3" : "flex flex-col gap-4"}>
      <MotionShell enabled={prefs.motion}>
        <section className="surface-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <FloatingOrbs enabled={prefs.motion} />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
              <Icon name="menu" className="size-3.5" />
              Menu
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
              <Icon name="spark" className="size-3.5" />
              {catalog.categories.length}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MenuCard icon="grid" title="BR" value={growth?.publicSignals.branches ?? 0} />
            <MenuCard icon="table" title="TB" value={growth?.publicSignals.tables ?? 0} />
            <MenuCard icon="menu" title="CT" value={catalog.categories.length} />
            <MenuCard icon="spark" title="IT" value={countItems(catalog.categories)} />
          </div>
        </section>
      </MotionShell>

      <MotionStack enabled={prefs.motion}>
        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-4 sm:p-5">
              <Tabs.Root value={mode} onValueChange={setMode} className="grid gap-4">
                <Tabs.List className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-black/[0.02] p-1">
                  <Tabs.Trigger
                    value="board"
                    aria-label="Board"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="grid" className="size-4" />
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="items"
                    aria-label="Items"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="stack" className="size-4" />
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="prefs"
                    aria-label="Prefs"
                    className="inline-flex size-10 items-center justify-center rounded-full text-black/50 transition data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    <Icon name="palette" className="size-4" />
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="board" className="grid gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                      <Icon name="grid" className="size-3.5" />
                      Categories
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory({ id: "", name: "", visible: true, accent: 0 });
                          setCategoryDialogOpen(true);
                        }}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-white text-black/65 transition hover:-translate-y-0.5"
                        aria-label="Add category"
                      >
                        <Icon name="plus" className="size-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!activeCategory) return;
                          setEditingItem({
                            id: "",
                            categoryId: activeCategory.id,
                            name: "",
                            price: "",
                            visible: true,
                            featured: false,
                          });
                          setItemDialogOpen(true);
                        }}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-black text-white transition hover:-translate-y-0.5"
                        aria-label="Add item"
                      >
                        <Icon name="spark" className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {catalog.categories.length ? (
                      <AnimatePresence mode="popLayout">
                        {catalog.categories.map((category) => (
                          <motion.div
                            layout
                            key={category.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[1.5rem] border border-black/8 bg-black/[0.02] p-4"
                            onClick={() => setSelectedCategoryId(category.id)}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="inline-flex items-center gap-3">
                                <span
                                  className="inline-flex size-10 items-center justify-center rounded-2xl text-white"
                                  style={{ background: accentColors[category.accent] }}
                                >
                                  <Icon name="grid" className="size-4" />
                                </span>
                                <div className="grid">
                                  <div className="text-sm font-medium text-black/76">{category.name || "—"}</div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                                    {category.items.length}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setEditingCategory({
                                      id: category.id,
                                      name: category.name,
                                      visible: category.visible,
                                      accent: category.accent,
                                    });
                                    setCategoryDialogOpen(true);
                                  }}
                                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/55"
                                >
                                  <Icon name="edit" className="size-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleCategoryVisibility(category.id);
                                  }}
                                  className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/55"
                                >
                                  <Icon name={category.visible ? "eye" : "switch"} className="size-4" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 grid gap-2">
                              {category.items.slice(0, 3).map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between rounded-full border border-black/8 bg-white px-4 py-3"
                                >
                                  <div className="inline-flex min-w-0 items-center gap-2">
                                    <Icon name="menu" className="size-4 text-black/35" />
                                    <span className="truncate text-sm text-black/72">{item.name || "—"}</span>
                                  </div>
                                  <span className="text-xs text-black/45">{item.price || "—"}</span>
                                </div>
                              ))}
                              {!category.items.length ? (
                                <div className="flex h-16 items-center justify-center rounded-[1.25rem] border border-dashed border-black/10 bg-white/60 text-black/22">
                                  <Icon name="plus" className="size-4" />
                                </div>
                              ) : null}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setSelectedCategoryId(category.id)}
                                className="inline-flex h-10 items-center gap-2 rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black"
                              >
                                <Icon name="eye" className="size-4" />
                                {category.items.length}
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteCategory(category.id)}
                                className="inline-flex h-10 items-center justify-center rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black"
                              >
                                <Icon name="trash" className="size-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    ) : (
                      Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-[1.5rem] border border-dashed border-black/10 bg-black/[0.02] p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-white text-black/30">
                              <Icon name="grid" className="size-4" />
                            </div>
                            <div className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/22">
                              <Icon name="plus" className="size-4" />
                            </div>
                          </div>
                          <div className="mt-4 h-3 w-20 rounded-full bg-black/5" />
                          <div className="mt-3 grid gap-2">
                            <div className="h-9 rounded-full bg-white/75" />
                            <div className="h-9 rounded-full bg-white/75" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Tabs.Content>

                <Tabs.Content value="items" className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                      <Icon name="stack" className="size-3.5" />
                      Products
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const targetCategoryId = activeCategory?.id || catalog.categories[0]?.id || "";
                        if (!targetCategoryId) return;
                        setEditingItem({
                          id: "",
                          categoryId: targetCategoryId,
                          name: "",
                          price: "",
                          visible: true,
                          featured: false,
                        });
                        setItemDialogOpen(true);
                      }}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-black text-white"
                    >
                      <Icon name="plus" className="size-4" />
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {allItems.length ? (
                      allItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-[1.35rem] border border-black/8 bg-white p-4 shadow-[0_1px_0_rgba(23,20,18,0.02)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="grid gap-2">
                              <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-black text-white">
                                <Icon name="menu" className="size-4" />
                              </div>
                              <div className="text-sm font-medium text-black/76">{item.name || "—"}</div>
                              <div className="text-[11px] uppercase tracking-[0.18em] text-black/40">
                                {item.categoryName}
                              </div>
                            </div>

                            <div className="grid justify-items-end gap-2">
                              <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/55">
                                {item.price || "—"}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleItemVisibility(item.categoryId, item.id)}
                                  className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-black/55"
                                >
                                  <Icon name={item.visible ? "eye" : "switch"} className="size-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => duplicateItem(item.categoryId, item)}
                                  className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-black/55"
                                >
                                  <Icon name="copy" className="size-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteItem(item.categoryId, item.id)}
                                  className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-black/55"
                                >
                                  <Icon name="trash" className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="rounded-[1.35rem] border border-dashed border-black/10 bg-black/[0.02] p-4"
                        >
                          <div className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black/30">
                            <Icon name="stack" className="size-4" />
                          </div>
                          <div className="mt-4 h-3 w-24 rounded-full bg-black/5" />
                          <div className="mt-3 h-9 rounded-full bg-white/75" />
                        </div>
                      ))
                    )}
                  </div>
                </Tabs.Content>

                <Tabs.Content value="prefs" className="grid gap-3">
                  <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/42">
                      <Icon name="palette" className="size-3.5" />
                      Density
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button className="inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white text-sm font-medium text-black">
                        <Icon name="switch" className="size-4" />
                      </button>
                      <button className="inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white text-sm font-medium text-black">
                        <Icon name="drag" className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-black/8 bg-black/[0.02] p-4">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/42">
                      <Icon name="search" className="size-3.5" />
                      Active
                    </div>
                    <div className="mt-3 rounded-[1.25rem] border border-black/8 bg-white px-4 py-3 text-sm text-black/70">
                      {activeCategory?.name || "—"}
                    </div>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </MotionItem>

          <MotionItem enabled={prefs.motion}>
            <div className="surface-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-black/42">
                  <Icon name="eye" className="size-3.5" />
                  Focus
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  <Icon name="shield" className="size-3.5" />
                  {activeCategory ? "1" : "0"}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {visibleItems.length ? (
                  visibleItems.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-full border border-black/8 bg-black/[0.02] px-4 py-3"
                    >
                      <div className="inline-flex items-center gap-3 min-w-0">
                        <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black">
                          <Icon name="menu" className="size-4" />
                        </span>
                        <span className="truncate text-sm text-black/72">{item.name || "—"}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/55">
                          {item.price || "—"}
                        </span>
                        <span className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white text-black/45">
                          <Icon name={item.featured ? "spark" : "dots"} className="size-4" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-full border border-dashed border-black/10 bg-black/[0.02] px-4 py-3"
                    >
                      <div className="inline-flex items-center gap-3">
                        <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-white text-black/25">
                          <Icon name="menu" className="size-4" />
                        </span>
                        <span className="h-3 w-24 rounded-full bg-black/5" />
                      </div>
                      <span className="inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white text-black/25">
                        <Icon name="plus" className="size-4" />
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </MotionItem>
        </section>
      </MotionStack>

      <CategoryFormDialog
        key={`${categoryDialogOpen ? "open" : "closed"}-${editingCategory?.id ?? "new"}`}
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        initial={editingCategory}
        onSave={saveCategory}
      />
      <ItemFormDialog
        key={`${itemDialogOpen ? "open" : "closed"}-${editingItem?.id ?? "new"}-${editingItem?.categoryId ?? selectedCategoryId}`}
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        initial={editingItem}
        categoryId={activeCategory?.id ?? catalog.categories[0]?.id ?? ""}
        categories={catalog.categories}
        onSave={saveItem}
      />
    </main>
  );
}
