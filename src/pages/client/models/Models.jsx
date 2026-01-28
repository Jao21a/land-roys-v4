import React, { useState } from 'react';
import { Filter, ChevronRight, Zap, Target, Gauge } from 'lucide-react';

const Models = () => {
    const [filter, setFilter] = useState('all');

    const motorcycles = [
        {
            id: 1,
            name: 'LR-Sport 300',
            category: 'Deportiva',
            price: '$4,500',
            image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
            specs: { cc: '300cc', power: '35 HP', weight: '150kg' }
        },
        {
            id: 2,
            name: 'Urban Glide 150',
            category: 'Scooter',
            price: '$2,100',
            image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
            specs: { cc: '150cc', power: '14 HP', weight: '110kg' }
        },
        {
            id: 3,
            name: 'Trail Master X',
            category: 'Enduro',
            price: '$3,800',
            image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070&auto=format&fit=crop',
            specs: { cc: '250cc', power: '28 HP', weight: '135kg' }
        },
        {
            id: 4,
            name: 'LR-Racing 600',
            category: 'Deportiva',
            price: '$8,200',
            image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
            specs: { cc: '600cc', power: '85 HP', weight: '175kg' }
        },
        {
            id: 5,
            name: 'City Commuter',
            category: 'Scooter',
            price: '$1,800',
            image: 'https://images.unsplash.com/photo-1622180203374-9524a54b734d?q=80&w=2069&auto=format&fit=crop',
            specs: { cc: '125cc', power: '11 HP', weight: '105kg' }
        },
        {
            id: 6,
            name: 'Desert Storm',
            category: 'Enduro',
            price: '$4,100',
            image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070&auto=format&fit=crop',
            specs: { cc: '300cc', power: '32 HP', weight: '140kg' }
        }
    ];

    const filteredBikes = filter === 'all'
        ? motorcycles
        : motorcycles.filter(moto => moto.category.toLowerCase() === filter);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] bg-black overflow-hidden flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop"
                    alt="Banner Modelos"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
                        Nuestros <span className="text-yellow-500">Modelos</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light">
                        Innovación y potencia en cada viaje
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-xl shadow-xl p-4 flex flex-wrap gap-4 justify-center items-center">
                    <div className="flex items-center gap-2 mr-4 text-gray-500 font-bold uppercase tracking-wider text-sm">
                        <Filter size={18} /> Filtrar por:
                    </div>
                    {['all', 'deportiva', 'scooter', 'enduro'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-1 ${filter === cat
                                    ? 'bg-yellow-400 text-black shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBikes.map((moto) => (
                    <div key={moto.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={moto.image}
                                alt={moto.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-yellow-400 font-bold px-3 py-1 rounded-full text-sm border border-yellow-500/30">
                                {moto.category}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full w-full hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2">
                                    Ver Detalles <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                    {moto.name}
                                </h3>
                                <span className="text-xl font-extrabold text-black">
                                    {moto.price}
                                </span>
                            </div>

                            {/* Specs */}
                            <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <div className="flex justify-center text-gray-400 mb-1"><Target size={16} /></div>
                                    <div className="text-xs font-bold text-gray-800">{moto.specs.cc}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Motor</div>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <div className="flex justify-center text-gray-400 mb-1"><Zap size={16} /></div>
                                    <div className="text-xs font-bold text-gray-800">{moto.specs.power}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Potencia</div>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <div className="flex justify-center text-gray-400 mb-1"><Gauge size={16} /></div>
                                    <div className="text-xs font-bold text-gray-800">{moto.specs.weight}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Peso</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Models;
