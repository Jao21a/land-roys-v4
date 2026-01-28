import React from 'react';
import { Search, Wrench, Circle, Disc, ShoppingCart } from 'lucide-react';

const Spares = () => {
    const categories = [
        { name: 'Motor', icon: <Wrench size={24} />, count: 120 },
        { name: 'Ruedas', icon: <Circle size={24} />, count: 45 },
        { name: 'Frenos', icon: <Disc size={24} />, count: 32 },
        { name: 'Eléctrico', icon: <Wrench size={24} />, count: 28 }, // Reusing Wrench for now, could act as placeholder
    ];

    const products = [
        { id: 1, name: 'Filtro de Aceite Premium', price: '$15.00', category: 'Motor', image: 'https://images.unsplash.com/photo-1635784065679-b88c7553b664?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'Pastillas de Freno Del.', price: '$28.50', category: 'Frenos', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200' },
        { id: 3, name: 'Neumático Sport 17"', price: '$120.00', category: 'Ruedas', image: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&q=80&w=200' },
        { id: 4, name: 'Bujía Iridium', price: '$12.00', category: 'Motor', image: 'https://images.unsplash.com/photo-1626127357493-271d5b0a7584?auto=format&fit=crop&q=80&w=200' },
        { id: 5, name: 'Cadena de Transmisión', price: '$45.00', category: 'Motor', image: 'https://images.unsplash.com/photo-1596460655866-9975775f0f35?auto=format&fit=crop&q=80&w=200' },
        { id: 6, name: 'Espejo Retrovisor Kit', price: '$35.00', category: 'Accesorios', image: 'https://images.unsplash.com/photo-1563821213-91c6e7f80456?auto=format&fit=crop&q=80&w=200' },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header Search */}
            <div className="bg-gray-900 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Catálogo de <span className="text-yellow-500">Repuestos</span> Originales
                    </h1>
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Buscar por nombre, modelo o código..."
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all backdrop-blur-md"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar Categories */}
                <div className="lg:w-1/4">
                    <div className="sticky top-24">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            Categorías
                        </h3>
                        <div className="space-y-3">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                                    <div className="flex items-center gap-3 text-gray-600 group-hover:text-yellow-600">
                                        <span className="p-2 bg-gray-100 rounded-lg group-hover:bg-yellow-100 transition-colors">
                                            {cat.icon}
                                        </span>
                                        <span className="font-medium">{cat.name}</span>
                                    </div>
                                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600 group-hover:bg-yellow-200">
                                        {cat.count}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                            <h4 className="font-bold text-yellow-800 mb-2">¿No encuentras tu repuesto?</h4>
                            <p className="text-sm text-yellow-700 mb-4">Contáctanos directamente y te ayudaremos a conseguirlo.</p>
                            <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors shadow-sm">
                                Contactar Asesor
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:w-3/4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Destacados</h2>
                        <select className="border-gray-200 rounded-lg text-sm p-2 bg-transparent">
                            <option>Más recientes</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 group bg-white">
                                <div className="bg-gray-100 rounded-xl h-48 mb-4 overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-yellow-500 hover:scale-110 transition-all">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                                <div className="text-xs text-gray-400 uppercase font-semibold mb-1">{product.category}</div>
                                <h3 className="font-bold text-gray-800 mb-2 leading-tight group-hover:text-yellow-600 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-extrabold text-black">{product.price}</span>
                                    <button className="text-xs font-bold text-gray-500 hover:text-black underline decoration-yellow-400 decoration-2">
                                        Ver ficha
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-2">
                        {[1, 2, 3, '...'].map((page, i) => (
                            <button key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${i === 0 ? 'bg-black text-yellow-400' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spares;
