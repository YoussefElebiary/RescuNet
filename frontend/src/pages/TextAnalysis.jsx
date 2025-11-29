import { useState, useRef } from 'react';
import { Keyboard, CloudUpload, Search, ChartPie, Activity as WaveSquare } from 'lucide-react';

export default function TextAnalysis() {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(`Selected: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleAnalyze = () => {
        if (!text.trim()) {
            alert("Please enter text or upload a file first.");
            return;
        }

        setLoading(true);
        setResult(null);

        // Simulate Network Delay
        setTimeout(() => {
            const analysisResult = mockAnalysis(text);
            setResult(analysisResult);
            setLoading(false);
        }, 1500);
    };

    const mockAnalysis = (inputText) => {
        const lowerText = inputText.toLowerCase();
        let type = 'not_emergency';

        if (lowerText.includes('help') || lowerText.includes('fire') || lowerText.includes('injured') || lowerText.includes('blood') || lowerText.includes('trapped')) {
            type = 'emergency';
        } else if (lowerText.includes('scam') || lowerText.includes('winner') || lowerText.includes('buy') || lowerText.includes('click here')) {
            type = 'fake';
        } else {
            const rand = Math.random();
            if (rand > 0.8) type = 'fake';
            else if (rand > 0.6) type = 'emergency';
        }

        let pEmerg, pNon, pFake;

        if (type === 'emergency') {
            pEmerg = 0.85 + (Math.random() * 0.14);
            pNon = (1 - pEmerg) * 0.7;
            pFake = (1 - pEmerg) * 0.3;
        } else if (type === 'fake') {
            pFake = 0.85 + (Math.random() * 0.14);
            pNon = (1 - pFake) * 0.6;
            pEmerg = (1 - pFake) * 0.4;
        } else {
            pNon = 0.80 + (Math.random() * 0.15);
            pEmerg = (1 - pNon) * 0.5;
            pFake = (1 - pNon) * 0.5;
        }

        return {
            classification: type,
            probabilities: {
                emergency: pEmerg,
                not_emergency: pNon,
                fake: pFake
            },
            entities: extractMockEntities(inputText)
        };
    };

    const extractMockEntities = (inputText) => {
        const words = inputText.split(/\s+/);
        const entities = [];
        words.forEach(word => {
            if (word.length > 3 && /^[A-Z]/.test(word)) {
                const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                if (!entities.includes(cleanWord)) entities.push(cleanWord);
            }
        });
        return entities.slice(0, 5);
    };

    return (
        <main className="flex-grow pt-24 px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Emergency Text Analysis</h2>
                    <p className="text-slate-400">Analyze distress messages or reports to determine their urgency and authenticity.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Keyboard className="text-blue-500 w-5 h-5" /> Input Data
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Message Content</label>
                                <textarea
                                    rows="8"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    placeholder="Paste distress message or report here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-900 text-slate-500">OR</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Upload Text File</label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <CloudUpload className="text-3xl text-slate-500 mb-3 group-hover:text-blue-500 transition-colors" />
                                        <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-slate-500">TXT, CSV, or JSON (MAX. 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".txt,.csv,.json"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </label>
                                {fileName && <p className="mt-2 text-sm text-blue-400 text-center">{fileName}</p>}
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search className="w-5 h-5" />}
                                {loading ? 'Analyzing...' : 'Analyze Text'}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChartPie className="text-purple-500 w-5 h-5" /> Analysis Results
                        </h3>

                        {!loading && !result && (
                            <div className="flex-grow flex flex-col items-center justify-center text-slate-500 py-12">
                                <WaveSquare className="w-16 h-16 mb-4 opacity-20" />
                                <p>Waiting for input...</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex-grow flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                                <p className="text-blue-400 font-medium animate-pulse">Processing Content...</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6">
                                <div
                                    className={`text-center p-6 rounded-xl border-2 transition-all ${result.classification === 'emergency'
                                        ? 'bg-red-900/20 border-red-500 text-red-400'
                                        : result.classification === 'fake'
                                            ? 'bg-slate-700/30 border-slate-500 text-slate-400'
                                            : 'bg-blue-900/20 border-blue-500 text-blue-400'
                                        }`}
                                >
                                    <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Classification</div>
                                    <div className="text-4xl font-bold">
                                        {result.classification === 'emergency'
                                            ? 'EMERGENCY'
                                            : result.classification === 'fake'
                                                ? 'FAKE / SPAM'
                                                : 'NOT EMERGENCY'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Emergency Probability', val: result.probabilities.emergency, color: 'bg-red-500' },
                                        { label: 'Non-Emergency Probability', val: result.probabilities.not_emergency, color: 'bg-blue-500' },
                                        { label: 'Fake/Spam Probability', val: result.probabilities.fake, color: 'bg-slate-500' },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-slate-400">{item.label}</span>
                                                <span className="text-white font-mono">{Math.round(item.val * 100)}%</span>
                                            </div>
                                            <div className="w-full bg-slate-800 rounded-full h-2">
                                                <div
                                                    className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                                                    style={{ width: `${Math.round(item.val * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Entities Detected</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {result.entities.length > 0 ? (
                                            result.entities.map((ent, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                                                    {ent}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-500 text-xs italic">No entities detected</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
