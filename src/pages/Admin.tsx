import { useState, useRef } from "react";
import { useArtworks, Artwork } from "@/context/ArtworkContext";
import { Pencil, Trash2, Plus, Star, Eye, EyeOff, LogOut, Upload } from "lucide-react";

const ADMIN_PASSWORD = "syki2024";

const CATEGORIES = ["Abstract", "Botanical", "Portrait", "Mixed Media", "Other"];

interface FormState {
  title: string;
  description: string;
  category: string;
  medium: string;
  year: string;
  imageUrl: string;
  featured: boolean;
  available: boolean;
  price: string;
}

const emptyForm = (): FormState => ({
  title: "",
  description: "",
  category: "Abstract",
  medium: "",
  year: new Date().getFullYear().toString(),
  imageUrl: "",
  featured: false,
  available: true,
  price: "",
});

const Admin = () => {
  const { artworks, addArtwork, updateArtwork, deleteArtwork } = useArtworks();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Auth ── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  /* ── Image upload ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPreviewImg(url);
      setForm((f) => ({ ...f, imageUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  /* ── Open form ── */
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setPreviewImg(null);
    setShowForm(true);
  };

  const openEdit = (artwork: Artwork) => {
    setEditingId(artwork.id);
    setForm({
      title: artwork.title,
      description: artwork.description,
      category: artwork.category,
      medium: artwork.medium,
      year: artwork.year,
      imageUrl: artwork.imageUrl,
      featured: artwork.featured,
      available: artwork.available,
      price: artwork.price ?? "",
    });
    setPreviewImg(artwork.imageUrl);
    setShowForm(true);
  };

  /* ── Submit ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl) {
      alert("Please upload an image.");
      return;
    }
    if (editingId) {
      updateArtwork(editingId, form);
    } else {
      addArtwork(form);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
    setPreviewImg(null);
  };

  /* ── Login Screen ── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-medium text-foreground">Admin</h1>
            <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">
              Syki-Arts Studio · Dashboard
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-card border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  authError ? "border-destructive" : "border-border"
                }`}
                placeholder="Enter admin password"
                autoFocus
              />
              {authError && (
                <p className="font-body text-xs text-destructive mt-1">Incorrect password.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded hover:bg-terracotta-600 transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="font-body text-xs text-muted-foreground text-center mt-6">
            Default password: <code className="font-mono">syki2024</code>
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <div>
            <span className="font-display text-lg font-medium text-foreground">Admin Dashboard</span>
            <span className="ml-3 font-body text-xs text-muted-foreground">Syki-Arts Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body text-xs tracking-wide rounded hover:bg-terracotta-600 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Artwork
            </button>
            <button
              onClick={() => setAuthed(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-12 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Works", value: artworks.length },
            { label: "Featured", value: artworks.filter((a) => a.featured).length },
            { label: "Available", value: artworks.filter((a) => a.available).length },
            { label: "Sold", value: artworks.filter((a) => !a.available).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border rounded p-5">
              <div className="font-display text-4xl font-medium text-primary">{value}</div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Artworks Table */}
        <div className="bg-card border border-border rounded overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-display text-xl font-medium text-foreground">All Artworks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  {["Image", "Title", "Category", "Medium", "Year", "Price", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-body text-xs uppercase tracking-widest text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-medium text-foreground">{artwork.title}</span>
                        {artwork.featured && (
                          <Star className="w-3 h-3 text-primary fill-primary" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">{artwork.category}</td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[140px] truncate">{artwork.medium}</td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">{artwork.year}</td>
                    <td className="px-4 py-3 font-body text-sm text-foreground">{artwork.price || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body uppercase tracking-wide w-fit ${
                            artwork.available
                              ? "bg-accent/15 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {artwork.available ? "Available" : "Sold"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateArtwork(artwork.id, { featured: !artwork.featured })}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title={artwork.featured ? "Unfeature" : "Feature"}
                        >
                          <Star className={`w-4 h-4 ${artwork.featured ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                        </button>
                        <button
                          onClick={() => updateArtwork(artwork.id, { available: !artwork.available })}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title={artwork.available ? "Mark Sold" : "Mark Available"}
                        >
                          {artwork.available ? (
                            <Eye className="w-4 h-4 text-accent" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => openEdit(artwork)}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(artwork.id)}
                          className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-destructive/60 hover:text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-background border border-border rounded w-full max-w-2xl my-8 shadow-xl">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-medium text-foreground">
                {editingId ? "Edit Artwork" : "Add New Artwork"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image upload */}
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Artwork Image *
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-border rounded h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden relative"
                >
                  {previewImg ? (
                    <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="font-body text-xs text-muted-foreground">Click to upload image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Grid of fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Artwork title"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Year</label>
                  <input
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="2024"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Medium</label>
                  <input
                    value={form.medium}
                    onChange={(e) => setForm((f) => ({ ...f, medium: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Acrylic on Canvas"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="A few sentences about this piece..."
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Price</label>
                  <input
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. ₦45,000"
                  />
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.available}
                      onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
                      className="w-4 h-4 accent-terracotta-500"
                    />
                    <span className="font-body text-sm text-foreground">Available for sale</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 accent-terracotta-500"
                    />
                    <span className="font-body text-sm text-foreground">Featured on homepage</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded hover:bg-terracotta-600 transition-colors"
                >
                  {editingId ? "Save Changes" : "Add Artwork"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-border text-foreground font-body text-sm rounded hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background border border-border rounded p-8 max-w-sm w-full text-center shadow-xl">
            <h3 className="font-display text-2xl font-medium text-foreground mb-3">Delete Artwork?</h3>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
              This action cannot be undone. The artwork will be permanently removed from the gallery.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { deleteArtwork(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 py-3 bg-destructive text-destructive-foreground font-body text-sm rounded hover:opacity-90 transition-opacity"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border border-border text-foreground font-body text-sm rounded hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
