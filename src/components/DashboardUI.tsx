"use client";

import React, { useState, useEffect } from "react";
import { BOOKMARKS as INITIAL_BOOKMARKS, Bookmark } from "@/data/bookmarks";
import { Search, Cpu, Briefcase, Code, User, TrendingUp, CreditCard, Moon, Star, Plus, Minus, Settings2, Trash2, GripVertical, ExternalLink, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarryBackground from "@/components/StarryBackground";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react';

export const CATEGORIES = [
    { id: "home", label: "Quick Access", icon: Star },
    { id: "ai", label: "AI Tools", icon: Cpu },
    { id: "gnomad", label: "Gnomad Studio", icon: Briefcase },
    { id: "web", label: "Web Dev", icon: Code },
    { id: "david", label: "Personal", icon: User },
    { id: "finance", label: "Finance", icon: TrendingUp },
    { id: "bills", label: "Bills", icon: CreditCard },
    { id: "terra", label: "TerraLuna", icon: Moon },
];

const SUBCATEGORY_GRADIENTS = [
    "from-accent-primary via-purple-500 to-accent-secondary",
    "from-accent-secondary via-teal-400 to-blue-500",
    "from-pink-500 via-accent-primary to-indigo-500",
    "from-cyan-400 via-accent-secondary to-blue-600",
    "from-indigo-400 via-purple-400 to-accent-primary",
    "from-blue-400 via-cyan-400 to-accent-secondary",
];

export default function DashboardUI({ currentCategory }: { currentCategory: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [greeting, setGreeting] = useState("Welcome back, David");
    const [time, setTime] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // State for dynamic content
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [visibleSections, setVisibleSections] = useState<string[]>(CATEGORIES.map(c => c.id));
    const [pinnedIds, setPinnedIds] = useState<string[]>([]);

    // Initialize state
    useEffect(() => {
        setIsMounted(true);

        const savedBookmarks = localStorage.getItem("vibe_bookmarks");
        if (savedBookmarks) {
            setBookmarks(JSON.parse(savedBookmarks));
        } else {
            setBookmarks(INITIAL_BOOKMARKS);
        }

        const savedSections = localStorage.getItem("vibe_sections");

        const savedPinned = localStorage.getItem("vibe_pinned");

        if (savedSections) setVisibleSections(JSON.parse(savedSections));
        if (savedPinned) setPinnedIds(JSON.parse(savedPinned));

        const tick = () => {
            const now = new Date();
            const hours = now.getHours();
            setGreeting(hours < 12 ? "Good morning, David" : hours < 18 ? "Good afternoon, David" : "Good evening, David");
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    // Save state to localStorage
    useEffect(() => {
        if (bookmarks.length > 0) localStorage.setItem("vibe_bookmarks", JSON.stringify(bookmarks));
        localStorage.setItem("vibe_sections", JSON.stringify(visibleSections));
        localStorage.setItem("vibe_pinned", JSON.stringify(pinnedIds));
    }, [bookmarks, visibleSections, pinnedIds]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        // If nothing changed
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        setBookmarks(prev => {
            const newBookmarks = [...prev];

            // 1. Find the item being moved
            const moveItemIndex = newBookmarks.findIndex(b => b.url === draggableId);
            if (moveItemIndex === -1) return prev;
            const [item] = newBookmarks.splice(moveItemIndex, 1);

            // 2. Adjust the item's subcategory if it moved to a different droppable
            const destinationSubcat = destination.droppableId.indexOf('grid-') === 0
                ? destination.droppableId.replace('grid-', '')
                : (item.subcategory || "General");

            item.subcategory = destinationSubcat === "General" ? undefined : destinationSubcat;

            // 3. Find the correct insertion point in the target subcategory group
            const subcatBookmarks = newBookmarks.filter(b =>
                b.category === currentCategory &&
                ((b.subcategory || "General") === (destinationSubcat || "General"))
            );

            if (subcatBookmarks.length === 0 || destination.index >= subcatBookmarks.length) {
                // If subcategory is empty or pushing to end, find the last item of this subcat
                const lastInSubcat = [...newBookmarks].reverse().findIndex(b =>
                    b.category === currentCategory &&
                    ((b.subcategory || "General") === (destinationSubcat || "General"))
                );

                if (lastInSubcat !== -1) {
                    const actualLastIndex = newBookmarks.length - 1 - lastInSubcat;
                    newBookmarks.splice(actualLastIndex + 1, 0, item);
                } else {
                    // Fallback to end of the whole category
                    const lastInCategory = [...newBookmarks].reverse().findIndex(b => b.category === currentCategory);
                    if (lastInCategory !== -1) {
                        const actualLastIndex = newBookmarks.length - 1 - lastInCategory;
                        newBookmarks.splice(actualLastIndex + 1, 0, item);
                    } else {
                        newBookmarks.push(item);
                    }
                }
            } else {
                // Find the index of the bookmark that is currently at the destination index in the main list
                const targetBookmark = subcatBookmarks[destination.index];
                const targetGlobalIndex = newBookmarks.findIndex(b => b.url === targetBookmark.url);
                newBookmarks.splice(targetGlobalIndex, 0, item);
            }

            return newBookmarks;
        });
    };

    const removeBookmark = (url: string) => {
        setBookmarks(bookmarks.filter(b => b.url !== url));
    };

    const toggleSection = (id: string) => {
        setVisibleSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const openAddModal = (subcategory: string) => {
        setEditingBookmark({
            name: "",
            url: "",
            domain: "",
            category: currentCategory,
            subcategory,
            emoji: "",
            faviconUrl: ""
        });
        setIsModalOpen(true);
    };

    const openEditModal = (bookmark: Bookmark) => {
        setEditingBookmark({ ...bookmark });
        setIsModalOpen(true);
    };

    const handleUrlChange = (url: string) => {
        let domain = editingBookmark?.domain || "";
        try {
            const urlObj = new URL(url);
            if (!editingBookmark?.domain) {
                domain = urlObj.hostname.replace("www.", "");
            }
        } catch (e) { }
        setEditingBookmark(prev => prev ? { ...prev, url, domain } : null);
    };

    const saveBookmark = () => {
        if (!editingBookmark) return;

        setBookmarks(prev => {
            // Check if we are updating an existing bookmark (by url match)
            const exists = prev.findIndex(b => b.url === editingBookmark.url || b.name === editingBookmark.name);
            if (exists >= 0) {
                const updated = [...prev];
                updated[exists] = editingBookmark;
                return updated;
            } else {
                return [...prev, editingBookmark];
            }
        });
        setIsModalOpen(false);
    };

    // Filter bookmarks primarily by the category passed into the page
    const filteredBookmarks = bookmarks.filter((b) => {
        const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.domain.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = b.category === currentCategory;

        if (searchQuery) return matchesSearch && matchesTab;
        return matchesTab;
    });

    // Group bookmarks by subcategory
    const groupedBookmarks = filteredBookmarks.reduce((groups, bookmark) => {
        const sub = bookmark.subcategory || "General";
        if (!groups[sub]) {
            groups[sub] = [];
        }
        groups[sub].push(bookmark);
        return groups;
    }, {} as Record<string, Bookmark[]>);

    // Sort subcategory keys so "General" is first, unless it's only one key
    const sortedSubcategories = Object.keys(groupedBookmarks).sort((a, b) => {
        if (a === "General") return -1;
        if (b === "General") return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <StarryBackground />

            <header className="text-center py-16 px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-4"
                >
                    <span className="text-4xl md:text-5xl">🦙</span>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-accent-primary to-accent-secondary bg-clip-text text-transparent px-2">
                        David's Dashboard
                    </h1>
                    <span className="text-4xl md:text-5xl">🦙</span>
                </motion.div>
                <p className="text-muted mt-4 text-lg opacity-60 tracking-widest uppercase font-bold">
                    Your universe · one click away
                </p>

                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`absolute top-8 right-8 p-3 rounded-full transition-all ${isEditMode ? 'bg-accent-primary text-black' : 'bg-white/5 text-white/50 hover:text-white'}`}
                    title="Toggle Edit Mode"
                    aria-label="Toggle Edit Mode"
                >
                    <Settings2 className="w-6 h-6" />
                </button>
            </header>

            <main className="flex-grow max-w-[1400px] mx-auto px-8 pb-48 w-full relative z-10">
                {/* Search Bar */}
                <div className="flex justify-center mb-16">
                    <div className="relative w-full max-w-2xl group">
                        <label htmlFor="search-bookmarks" className="sr-only">Search Bookmarks</label>
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-accent-primary transition-colors" />
                        <input
                            id="search-bookmarks"
                            name="search"
                            type="text"
                            placeholder="Search all bookmarks..."
                            title="Search bookmarks by name or URL"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 rounded-full glass border-white/5 group-focus-within:border-accent-primary/30 outline-none transition-all text-lg"
                        />
                    </div>
                </div>

                {/* Bookmark Grid with Subcategories */}
                {isMounted && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {sortedSubcategories.map((subcat, subcatIdx) => {
                            const gradientClass = SUBCATEGORY_GRADIENTS[subcatIdx % SUBCATEGORY_GRADIENTS.length];
                            return (
                                <div key={subcat} className="mb-16">
                                    {/* Only show subcategory header if not "General" or if there's multiple */}
                                    {subcat !== "General" && (
                                        <h3 className={`text-3xl font-black mb-6 border-b border-white/10 pb-4 uppercase tracking-widest bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent w-fit pr-8`}>
                                            {subcat}
                                        </h3>
                                    )}

                                    <Droppable droppableId={`grid-${subcat}`} direction="horizontal">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                                            >
                                                {groupedBookmarks[subcat].map((bookmark, index) => {
                                                    // Find the global index across the entire bookmarks array to ensure consistent Drag/drop indexes
                                                    const globalIndex = bookmarks.findIndex(b => b.url === bookmark.url);
                                                    return (
                                                        <Draggable
                                                            key={bookmark.url}
                                                            draggableId={bookmark.url}
                                                            index={index}
                                                            isDragDisabled={!isEditMode}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="group relative"
                                                                >
                                                                    <a
                                                                        href={bookmark.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        title={bookmark.description || `${bookmark.name} - ${bookmark.url}`}
                                                                        className="flex flex-col items-center gap-4 p-8 glass-card"
                                                                    >
                                                                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-accent-primary/20 transition-all">
                                                                            {bookmark.emoji ? (
                                                                                <span className="text-4xl">{bookmark.emoji}</span>
                                                                            ) : bookmark.faviconUrl ? (
                                                                                <img
                                                                                    src={bookmark.faviconUrl}
                                                                                    alt={`${bookmark.name} favicon`}
                                                                                    className="w-10 h-10 object-contain"
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}&sz=64`}
                                                                                    alt=""
                                                                                    className="w-10 h-10 object-contain"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        <div className="text-center overflow-hidden w-full">
                                                                            <p className="text-base font-bold truncate leading-tight">{bookmark.name}</p>
                                                                            <p className="text-xs text-muted opacity-50 mt-1 truncate">{bookmark.domain}</p>
                                                                        </div>
                                                                    </a>

                                                                    {isEditMode && (
                                                                        <div className="absolute -top-2 -right-2 flex gap-1 z-20">
                                                                            <button
                                                                                onClick={() => openEditModal(bookmark)}
                                                                                className="bg-blue-500/80 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg transition-colors"
                                                                                title="Edit Bookmark"
                                                                                aria-label="Edit Bookmark"
                                                                            >
                                                                                <Edit2 className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => removeBookmark(bookmark.url)}
                                                                                className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transition-colors"
                                                                                title="Delete Bookmark"
                                                                                aria-label="Delete Bookmark"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                            <div className="bg-white/10 p-2 rounded-full cursor-grab" title="Drag to move" aria-label="Drag to move">
                                                                                <GripVertical className="w-4 h-4" />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                {isEditMode && (
                                                    <div
                                                        className="flex flex-col items-center justify-center gap-4 p-8 glass-card border-2 border-dashed border-white/10 hover:border-accent-primary/40 cursor-pointer group transition-all"
                                                        title={`Add bookmark to ${subcat}`}
                                                        onClick={() => openAddModal(subcat)}
                                                    >
                                                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/5 group-hover:bg-accent-primary/10 transition-all">
                                                            <Plus className="w-10 h-10 text-white/30 group-hover:text-accent-primary" />
                                                        </div>
                                                        <div className="text-center overflow-hidden w-full">
                                                            <p className="text-base font-bold text-white/40 group-hover:text-accent-primary transition-colors">Add Bookmark</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            );
                        })}
                    </DragDropContext>
                )}
            </main>

            {/* Modern Glassy Footer Frame */}
            <footer className="mt-auto relative z-50 px-8 pb-10 pt-16">
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="max-w-5xl mx-auto glass-footer beveled p-8 flex flex-col items-center gap-8 shadow-black/80"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-black italic tracking-tighter">{greeting}</h2>
                        <div className="flex items-center justify-center gap-6 mt-2 text-[12px] text-muted tracking-widest uppercase font-black opacity-60">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-secondary shadow-[0_0_12px_hsla(171,65%,70%,0.8)] animate-pulse" />
                                Live Hub Operational
                            </span>
                            <span>🕒 {time}</span>
                            <span>☀️ 72°F · Rogers, AR</span>
                        </div>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isVisible = visibleSections.includes(cat.id);
                            return (
                                <div key={cat.id} className="relative group">
                                    <Link
                                        href={cat.id === "home" ? "/" : `/${cat.id}`}
                                        className={`
                      flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black transition-all uppercase tracking-tighter
                      ${currentCategory === cat.id
                                                ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-black shadow-xl scale-105"
                                                : "bg-white/5 border border-white/5 text-muted hover:bg-white/10 hover:border-white/20"}
                      ${!isVisible ? "opacity-30 grayscale" : "opacity-100"}
                    `}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.label}
                                    </Link>
                                    {isEditMode && (
                                        <button
                                            onClick={() => toggleSection(cat.id)}
                                            className={`absolute -top-2 -right-2 p-1 rounded-full text-white text-[10px] ${isVisible ? 'bg-green-500' : 'bg-white/20'}`}
                                            title={isVisible ? "Hide Category" : "Show Category"}
                                            aria-label={isVisible ? "Hide Category" : "Show Category"}
                                        >
                                            {isVisible ? '✓' : '+'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
                        ✦ David's Dashboard · Vibe v2 🦙
                    </div>
                </motion.div>
            </footer>

            {/* Add Bookmark Modal */}
            <AnimatePresence>
                {isModalOpen && editingBookmark && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-background border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
                        >
                            <h2 className="text-2xl font-black mb-6">{editingBookmark.url ? "Edit Bookmark" : "Add New Bookmark"}</h2>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                <div>
                                    <label htmlFor="b-name" className="block text-sm font-bold opacity-70 mb-1">Name</label>
                                    <input
                                        id="b-name"
                                        autoFocus
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors"
                                        placeholder="Awesome Tool"
                                        title="Enter bookmark name"
                                        value={editingBookmark.name}
                                        onChange={e => setEditingBookmark({ ...editingBookmark, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b-url" className="block text-sm font-bold opacity-70 mb-1">URL</label>
                                    <input
                                        id="b-url"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors"
                                        placeholder="https://example.com"
                                        title="Enter secure HTTPS URL"
                                        value={editingBookmark.url}
                                        onChange={e => handleUrlChange(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b-domain" className="block text-sm font-bold opacity-70 mb-1">Domain (for auto Favicon)</label>
                                    <input
                                        id="b-domain"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors"
                                        value={editingBookmark.domain}
                                        onChange={e => setEditingBookmark({ ...editingBookmark, domain: e.target.value })}
                                        placeholder="e.g. example.com"
                                        title="Root domain for fallback favicon generation"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b-favicon" className="block text-sm font-bold opacity-70 mb-1">Custom Favicon URL</label>
                                    <input
                                        id="b-favicon"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors"
                                        placeholder="https://example.com/logo.png"
                                        title="Direct image tag for custom favicon"
                                        value={editingBookmark.faviconUrl || ""}
                                        onChange={e => setEditingBookmark({ ...editingBookmark, faviconUrl: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="b-emoji" className="block text-sm font-bold opacity-70 mb-1">Custom Emoji (Overrides Favicons)</label>
                                    <div className="relative flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors"
                                            title="Open Emoji Picker"
                                        >
                                            {editingBookmark.emoji || "😊"}
                                        </button>
                                        <input
                                            id="b-emoji"
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors"
                                            placeholder="e.g. 📸"
                                            title="Paste an emoji here to stand out"
                                            value={editingBookmark.emoji || ""}
                                            onChange={e => setEditingBookmark({ ...editingBookmark, emoji: e.target.value })}
                                        />

                                        {/* Emoji Picker Popup */}
                                        <AnimatePresence>
                                            {showEmojiPicker && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 mt-2 z-50 shadow-2xl"
                                                >
                                                    <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                                                    <div className="relative z-50">
                                                        <EmojiPicker
                                                            theme={Theme.DARK}
                                                            onEmojiClick={(emojiData: EmojiClickData) => {
                                                                setEditingBookmark({ ...editingBookmark, emoji: emojiData.emoji });
                                                                setShowEmojiPicker(false);
                                                            }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="b-description" className="block text-sm font-bold opacity-70 mb-1">Description / Tooltip</label>
                                    <textarea
                                        id="b-description"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-accent-primary/50 transition-colors resize-y custom-scrollbar min-h-[80px]"
                                        placeholder="Add a short note about this site..."
                                        title="Notes or tooltip text that displays on hover"
                                        value={editingBookmark.description || ""}
                                        onChange={e => setEditingBookmark({ ...editingBookmark, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-bold"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 py-3 rounded-xl bg-accent-primary text-black font-black transition-colors hover:brightness-110"
                                    onClick={saveBookmark}
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
