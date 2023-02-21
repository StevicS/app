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
						};
						notes.push(note);
						this.notes = notes;
					});
					this.notesLoaded = true;
				},
				(error) => {
					console.log(error.message);
				}
			);
		},
		clearNotes() {
			this.notes = [];
			if (getNotesSnapshot) getNotesSnapshot(); // unsubscribe from active listener
		},
		async addNote(newNoteContent) {
			let currentDate = new Date().getTime();
			let date = currentDate.toString();
			// const userNote = {
			// 	id: id,
			// 	content: newNoteContent,
			// };
			// this.notes.unshift(userNote);

			// await setDoc(doc(noteCollectionRef, id), {
			// 	content: newNoteContent,
			// 	// id: id
			// 	id,
			// });

			await addDoc(noteCollectionRef, {
				content: newNoteContent,
				date,
			});
		},
		async deleteNote(idToDelete) {
			await deleteDoc(doc(noteCollectionRef, idToDelete));
			this.notes = this.notes.filter((note) => {
				return note.id !== idToDelete;
			});
		},
		async upadateNote(id, content) {
			// let index = this.notes.findIndex((note) => {
			// 	return note.id === id;
			// });
			// this.notes[index].content = content;

			await updateDoc(doc(noteCollectionRef, id), {
				// content: content
				content,
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
		totalNotesCount: (state) => {
			return state.notes.length;
		},
		totalCharCount: (state) => {
			let count = 0;
			state.notes.forEach((note) => {
				count += note.content.length;
			});
			return count;
		},
	},
});
