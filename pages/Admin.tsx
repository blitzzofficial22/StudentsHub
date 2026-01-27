import React, { useState, useRef } from 'react';
import { Settings, FileText, AlertTriangle, Users, GripVertical, Plus, Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft';
  views: number;
}

const INITIAL_CONTENT: ContentItem[] = [
  { id: '1', title: 'Cardiovascular System Overview', category: 'Anatomy', status: 'published', views: 1250 },
  { id: '2', title: 'Pharmacology 101: Beta Blockers', category: 'Pharma', status: 'published', views: 980 },
  { id: '3', title: 'Pediatric Vital Signs Chart', category: 'Pediatrics', status: 'draft', views: 0 },
  { id: '4', title: 'Ethics in Nursing Practice', category: 'Ethics', status: 'published', views: 450 },
  { id: '5', title: 'Cranial Nerves Mnemonic Guide', category: 'Neurology', status: 'draft', views: 0 },
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content'); // Set to content to show new features immediately
  const [items, setItems] = useState<ContentItem[]>(INITIAL_CONTENT);
  
  // Drag and Drop Refs
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const draggedIdx = dragItem.current;
    const droppedIdx = dragOverItem.current;

    if (draggedIdx === null || droppedIdx === null || draggedIdx === droppedIdx) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const _items = [...items];
    const draggedItemContent = _items[draggedIdx];
    _items.splice(draggedIdx, 1);
    _items.splice(droppedIdx, 0, draggedItemContent);

    setItems(_items);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const toggleStatus = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'published' ? 'draft' : 'published' } : item
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button onClick={() => setActiveTab('overview')} className={`p-4 rounded-xl text-left border ${activeTab === 'overview' ? 'bg-brand-50 border-brand-500 text-brand-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <Settings size={20} />
            <span className="font-semibold">Settings</span>
          </div>
          <p className="text-xs opacity-75">Platform configuration</p>
        </button>
        <button onClick={() => setActiveTab('content')} className={`p-4 rounded-xl text-left border ${activeTab === 'content' ? 'bg-brand-50 border-brand-500 text-brand-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <FileText size={20} />
            <span className="font-semibold">Content</span>
          </div>
          <p className="text-xs opacity-75">Manage study pages</p>
        </button>
         <button onClick={() => setActiveTab('users')} className={`p-4 rounded-xl text-left border ${activeTab === 'users' ? 'bg-brand-50 border-brand-500 text-brand-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} />
            <span className="font-semibold">Users</span>
          </div>
          <p className="text-xs opacity-75">Manage students</p>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
             <h3 className="text-lg font-bold">Platform Configuration</h3>
             <div className="flex items-center justify-between py-3 border-b">
               <div>
                 <p className="font-medium">Enable Ads</p>
                 <p className="text-sm text-gray-500">Inject AdSense placeholders into student views</p>
               </div>
               <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border bg-green-500 cursor-pointer">
                  <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform"></span>
               </div>
             </div>
             <div className="flex items-center justify-between py-3 border-b">
               <div>
                 <p className="font-medium">Maintenance Mode</p>
                 <p className="text-sm text-gray-500">Disable access for non-admin users</p>
               </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border bg-gray-200 cursor-pointer">
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform"></span>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Study Guides & Resources</h3>
                <p className="text-sm text-gray-500">Drag and drop items to reorganize the student curriculum.</p>
              </div>
              <button className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 transition shadow-sm font-medium">
                <Plus size={18} /> Add Content
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 cursor-move hover:shadow-md transition-all active:cursor-grabbing group"
                >
                  <div className="text-gray-300 group-hover:text-gray-500 transition-colors">
                    <GripVertical size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 font-medium">
                        {item.category}
                      </span>
                      <span className="text-gray-400">• {item.views} reads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-colors ${
                          item.status === 'published'
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                      }`}
                     >
                       {item.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                       {item.status.toUpperCase()}
                     </button>
                     
                     <div className="h-6 w-px bg-gray-200 mx-1"></div>

                     <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                       <Edit2 size={18} />
                     </button>
                     <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                       <Trash2 size={18} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
            
            {items.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    <FileText size={48} className="mx-auto mb-2 opacity-20" />
                    <p>No content available.</p>
                </div>
            )}
          </div>
        )}
        
        {activeTab === 'users' && (
             <div className="text-center py-10 text-gray-500">
             <Users size={48} className="mx-auto mb-4 opacity-20" />
             <p>User Management System.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Admin;