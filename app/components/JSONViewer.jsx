"use client";
import React, { useState, useMemo, memo } from 'react';
import { Settings, Upload, Table, Grid, List, Code, Sparkles, Download, X, Zap } from 'lucide-react';

// ============= CONSTANTS =============
const ACCENT_COLORS = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500'
};

const FONT_SIZES = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
};

// ============= SETTINGS PANEL COMPONENT =============
const SettingsPanel = memo(({ settings, setSettings }) => (
    <div className="relative backdrop-blur-xl bg-black/30 border-b border-gray-800 shadow-2xl animate-slideUp">
        <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Personnalisation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Couleur d'accent</label>
                    <div className="flex gap-2">
                        {Object.keys(ACCENT_COLORS).map(color => (
                            <button
                                key={color}
                                onClick={() => setSettings(prev => ({ ...prev, accentColor: color }))}
                                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ACCENT_COLORS[color]} ${settings.accentColor === color ? 'ring-4 ring-white/50 scale-110' : ''} transition-all duration-300 hover:scale-110`}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Taille police</label>
                    <select
                        value={settings.fontSize}
                        onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="small">Petite</option>
                        <option value="medium">Moyenne</option>
                        <option value="large">Grande</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Indentation</label>
                    <input
                        type="number"
                        min="1"
                        max="8"
                        value={settings.indentSize}
                        onChange={(e) => setSettings(prev => ({ ...prev, indentSize: parseInt(e.target.value) }))}
                        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all duration-300 w-full">
                        <input
                            type="checkbox"
                            checked={settings.showTypes}
                            onChange={(e) => setSettings(prev => ({ ...prev, showTypes: e.target.checked }))}
                            className="w-5 h-5 rounded accent-blue-500"
                        />
                        <span className="text-sm text-gray-300">Types</span>
                    </label>
                </div>
                <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all duration-300 w-full">
                        <input
                            type="checkbox"
                            checked={settings.collapsible}
                            onChange={(e) => setSettings(prev => ({ ...prev, collapsible: e.target.checked }))}
                            className="w-5 h-5 rounded accent-blue-500"
                        />
                        <span className="text-sm text-gray-300">Pliable</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
));

// ============= VIEW MODE SELECTOR COMPONENT =============
const ViewModeSelector = memo(({ viewMode, setViewMode, onDownload, onClear, accentColor }) => {
    const modes = [
        { id: 'tree', label: 'Arborescence', icon: List },
        { id: 'table', label: 'Tableau', icon: Table },
        { id: 'cards', label: 'Cartes', icon: Grid },
        { id: 'code', label: 'Code', icon: Code }
    ];

    return (
        <div className="flex gap-3 mb-8 flex-wrap items-center animate-slideUp">
            {modes.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${viewMode === id
                        ? `bg-gradient-to-r ${ACCENT_COLORS[accentColor]} text-white shadow-lg scale-105`
                        : 'bg-white/5 hover:bg-white/10 border border-gray-800'
                        }`}
                >
                    <Icon className="w-5 h-5" />
                    {label}
                </button>
            ))}

            <div className="ml-auto flex gap-3">
                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 border border-gray-800 hover:scale-105"
                >
                    <Download className="w-5 h-5" />
                    Export
                </button>
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all duration-300 border border-red-500/30 hover:scale-105"
                >
                    <X className="w-5 h-5" />
                    Effacer
                </button>
            </div>
        </div>
    );
});

// ============= UPLOAD SECTION COMPONENT =============
const UploadSection = memo(({ onFileUpload, onLoadSample, accentColor }) => (
    <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-gray-800 shadow-2xl p-12 text-center animate-scaleIn">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${ACCENT_COLORS[accentColor]} flex items-center justify-center shadow-2xl`}>
            <Upload className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Glissez votre fichier JSON
        </h2>
        <p className="text-gray-400 mb-8">Ou sélectionnez-le depuis votre ordinateur</p>
        <input
            type="file"
            accept=".json"
            onChange={onFileUpload}
            className="hidden"
            id="fileInput"
        />
        <label
            htmlFor="fileInput"
            className={`inline-block bg-gradient-to-r ${ACCENT_COLORS[accentColor]} text-white px-8 py-4 rounded-2xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold`}
        >
            Sélectionner un fichier
        </label>
        <div className="mt-6">
            <button
                onClick={onLoadSample}
                className="text-gray-400 hover:text-white transition-all duration-300 hover:underline flex items-center gap-2 mx-auto"
            >
                <Sparkles className="w-4 h-4" />
                Charger des données d'exemple
            </button>
        </div>
    </div>
));

// ============= TREE VIEW COMPONENT =============
const TreeView = memo(({ data, settings }) => {
    const renderValue = (value, key = '', depth = 0) => {
        const typeColor = {
            string: 'text-emerald-400',
            number: 'text-blue-400',
            boolean: 'text-purple-400',
            null: 'text-gray-500'
        };

        if (value === null) {
            return <span className={typeColor.null}>null</span>;
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
            return (
                <details open={depth < 2 && settings.collapsible} className="group">
                    <summary className="cursor-pointer font-semibold text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5">
                        <span className="text-xs text-gray-500">▶</span>
                        {key && <span className="text-white">{key}</span>}
                        <span className="text-gray-500 text-sm">{'{'} {Object.keys(value).length} {'}'}</span>
                    </summary>
                    <div className="ml-6 border-l-2 border-gray-700 pl-4 mt-2 space-y-2">
                        {Object.entries(value).map(([k, v]) => (
                            <div key={k}>
                                {renderValue(v, k, depth + 1)}
                            </div>
                        ))}
                    </div>
                </details>
            );
        }

        if (Array.isArray(value)) {
            return (
                <details open={depth < 2 && settings.collapsible} className="group">
                    <summary className="cursor-pointer font-semibold text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5">
                        <span className="text-xs text-gray-500">▶</span>
                        {key && <span className="text-white">{key}</span>}
                        <span className="text-gray-500 text-sm">[{value.length}]</span>
                    </summary>
                    <div className="ml-6 border-l-2 border-gray-700 pl-4 mt-2 space-y-2">
                        {value.map((item, idx) => (
                            <div key={idx}>
                                {renderValue(item, `[${idx}]`, depth + 1)}
                            </div>
                        ))}
                    </div>
                </details>
            );
        }

        return (
            <div className="flex items-baseline gap-2 py-1 px-2 rounded hover:bg-white/5 transition-all duration-200">
                {key && <span className="font-medium text-gray-300">{key}:</span>}
                <span className={`${typeColor[typeof value] || 'text-gray-300'} font-mono`}>
                    {typeof value === 'string' ? `"${value}"` : String(value)}
                </span>
                {settings.showTypes && (
                    <span className="text-xs text-gray-600 font-mono">({typeof value})</span>
                )}
            </div>
        );
    };

    return <div>{renderValue(data)}</div>;
});

// ============= TABLE VIEW COMPONENT =============
const TableView = memo(({ data }) => {
    if (!Array.isArray(data)) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 text-lg">La vue tableau nécessite un tableau JSON</div>
            </div>
        );
    }

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-4 text-left font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-700">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-800 hover:bg-white/5 transition-all duration-200">
                            {headers.map(header => (
                                <td key={header} className="px-6 py-4 text-gray-300">
                                    {typeof row[header] === 'boolean' ? (
                                        <span className={`px-2 py-1 rounded-full text-xs ${row[header] ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {String(row[header])}
                                        </span>
                                    ) : typeof row[header] === 'object' ? (
                                        JSON.stringify(row[header])
                                    ) : (
                                        String(row[header])
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

// ============= CARD VIEW COMPONENT =============
const CardView = memo(({ data }) => {
    const items = Array.isArray(data) ? data : Object.entries(data).map(([k, v]) => ({ key: k, value: v }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                    {Object.entries(item).map(([key, value]) => (
                        <div key={key} className="mb-3 last:mb-0">
                            <div className="flex items-start justify-between gap-2">
                                <span className="font-semibold text-gray-400 text-sm uppercase tracking-wide">{key}</span>
                                {typeof value === 'boolean' && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {String(value)}
                                    </span>
                                )}
                            </div>
                            {typeof value !== 'boolean' && (
                                <div className="text-white font-medium mt-1">
                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

// ============= CODE VIEW COMPONENT =============
const CodeView = memo(({ data, settings }) => (
    <div className="relative">
        <pre className="bg-black/50 text-green-400 p-6 rounded-2xl overflow-x-auto border border-gray-800 backdrop-blur-sm font-mono text-sm leading-relaxed">
            <code>{JSON.stringify(data, null, settings.indentSize)}</code>
        </pre>
    </div>
));

// ============= MAIN COMPONENT =============
export default function JSONViewer() {
    const [jsonData, setJsonData] = useState(null);
    const [viewMode, setViewMode] = useState('tree');
    const [showSettings, setShowSettings] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 'medium',
        showTypes: true,
        collapsible: true,
        indentSize: 2,
        accentColor: 'blue'
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target.result);
                    setIsAnimating(true);
                    setTimeout(() => {
                        setJsonData(json);
                        setIsAnimating(false);
                    }, 300);
                } catch (error) {
                    alert('Erreur: Fichier JSON invalide');
                }
            };
            reader.readAsText(file);
        }
    };

    const loadSampleData = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const downloadJSON = () => {
        const dataStr = JSON.stringify(jsonData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'data.json');
        linkElement.click();
    };

    // Memoize the current view to prevent unnecessary re-renders
    const CurrentView = useMemo(() => {
        const views = {
            tree: <TreeView data={jsonData} settings={settings} />,
            table: <TableView data={jsonData} />,
            cards: <CardView data={jsonData} />,
            code: <CodeView data={jsonData} settings={settings} />
        };
        return views[viewMode];
    }, [viewMode, jsonData, settings]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
                .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
                .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
                details summary::-webkit-details-marker { display: none; }
                details[open] > summary > span:first-child { transform: rotate(90deg); }
                details > summary > span:first-child { transition: transform 0.2s; display: inline-block; }
            `}</style>

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${ACCENT_COLORS[settings.accentColor]} opacity-10 blur-3xl animate-pulse-custom`}></div>
                <div className={`absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr ${ACCENT_COLORS[settings.accentColor]} opacity-10 blur-3xl animate-pulse-custom`} style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <div className="relative backdrop-blur-xl bg-black/30 border-b border-gray-800 shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 animate-fadeIn">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ACCENT_COLORS[settings.accentColor]} flex items-center justify-center shadow-lg`}>
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    JSON Viewer Pro
                                </h1>
                                <p className="text-gray-500 text-sm">Visualisez vos données avec style</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 animate-fadeIn"
                        >
                            <Settings className={`w-6 h-6 ${showSettings ? 'rotate-90' : ''} transition-transform duration-300`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && <SettingsPanel settings={settings} setSettings={setSettings} />}

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-8">
                {!jsonData ? (
                    <UploadSection
                        onFileUpload={handleFileUpload}
                        onLoadSample={loadSampleData}
                        accentColor={settings.accentColor}
                    />
                ) : (
                    <>
                        <ViewModeSelector
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            onDownload={downloadJSON}
                            onClear={() => setJsonData(null)}
                            accentColor={settings.accentColor}
                        />

                        <div className={`backdrop-blur-xl bg-white/5 rounded-3xl border border-gray-800 shadow-2xl p-8 ${FONT_SIZES[settings.fontSize]} ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} transition-all duration-300`}>
                            {CurrentView}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}