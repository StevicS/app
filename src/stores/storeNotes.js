import { defineStore } from 'pinia';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { useStoreAuth } from '@/stores/storeAuth';

let noteCollectionRef;
let noteCollectionQuery;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
	state: () => {
		return {
			notes: [],
			notesLoaded: false,
			routerValueName: '',
		};
	},
	actions: {
		init() {
			const storeAuth = useStoreAuth();

			noteCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes');
			noteCollectionQuery = query(noteCollectionRef, orderBy('date', 'desc'));
			this.getNotes();
		},
		async getNotes() {
			this.notesLoaded = false;

			getNotesSnapshot = onSnapshot(
				noteCollectionQuery,
				(querySnapshot) => {
					let notes = [];
					querySnapshot.forEach((doc) => {
						let note = {
							id: doc.id,
							content: doc.data().content,
							date: doc.data().date,
							category: doc.data().category,
						};
						notes.push(note);
						this.notes = notes;
					});
					this.notesLoaded = true;
				},
				(error) => {}
			);
		},
		clearNotes() {
			this.notes = [];
			if (getNotesSnapshot) getNotesSnapshot();
		},
		async addNote(newNoteContent, newCategorValue) {
			let currentDate = new Date().getTime();
			let date = currentDate.toString();

			await addDoc(noteCollectionRef, {
				content: newNoteContent,
				category: newCategorValue,
				date,
			});
		},
		async deleteNote(idToDelete) {
			await deleteDoc(doc(noteCollectionRef, idToDelete));
			this.notes = this.notes.filter((note) => {
				return note.id !== idToDelete;
			});
		},
		async upadateNote(id, category, content) {
			await updateDoc(doc(noteCollectionRef, id), {
				content,
				category,
			});
		},
	},
	getters: {
		getNoteContent: (state) => {
			return (id) => {
				return state.notes.filter((note) => {
					return note.id === id;
				})[0].content;
			};
		},
		getNoteCategory: (state) => {
			return (id) => {
				return state.notes.filter((note) => {
					return note.id === id;
				})[0].category;
			};
		},
	},
});
