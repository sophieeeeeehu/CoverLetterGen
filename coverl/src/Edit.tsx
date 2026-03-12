import { useState, useEffect } from 'react'
import { supabase } from './supabase';

function Edit() {
    const [ability, setAbility] = useState<any[]>([])
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const blankItem = {
        name: '',
        description: '',
        content: ''
    };

    // this can save and update the rows in cover letter table
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedItem.id) {
            // --- UPDATE LOGIC ---
            const { error } = await supabase
                .from('CoverLetter')
                .update(selectedItem)
                .eq('id', selectedItem.id);

            if (!error) {
                setAbility(ability.map(a => a.id === selectedItem.id ? selectedItem : a));
            }
        } else {
            // --- ADD LOGIC ---
            const { error } = await supabase
                .from('CoverLetter')
                .insert({ name: selectedItem.name, description: selectedItem.description, content: selectedItem.content })

            if (error) {
                alert(error.message)
            }
        }
        setSelectedItem(null); // Close modal
        alert('Inserted!')
    };


    useEffect(() => {
        const fetchParag = async () => {
            const { data, error } = await supabase
                .from('CoverLetter')
                .select('*')
                .order('id', { ascending: true })

            if (error) {
                console.error(error)
            } else {
                setAbility(data ?? [])
                console.log("ability set!")
            }

        }
        fetchParag()
    }, [])

    return (
        <div style={{ maxWidth: '1280px', margin: '20px auto' }}>
            {selectedItem && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Item</h2>
                        <form onSubmit={handleSave}>
                            <h3>Name</h3>
                            <input
                                value={selectedItem.name}
                                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                            />

                            <h3>Starting Paragraph (I believe .... can)</h3>
                            <input
                                value={selectedItem.description}
                                onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                            />

                            <h3>Paragraph</h3>
                            <textarea
                                value={selectedItem.content}
                                onChange={(e) => setSelectedItem({ ...selectedItem, content: e.target.value })}
                            />

                            <div className="modal-buttons">
                                <button>Save Changes</button>
                                <button onClick={() => setSelectedItem(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className='cover-list'>
                {ability.map((a, index) => (
                    <div key={a.id}
                        className='cover-item'
                        onClick={() => setSelectedItem(a)}>
                        <h3>{index + 1}. {a.name}</h3>
                        <p className='desc'>I believe {a.description} can ...</p>
                        <p>{a.content}</p>
                    </div>
                ))}
            </div>
            <button
                className="add-btn"
                onClick={() => setSelectedItem(blankItem)}
            >
                + Add New Cover Letter
            </button>
        </div>
    )
}

export default Edit
