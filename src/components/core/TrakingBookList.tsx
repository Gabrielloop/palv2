import TrackingItem from 'components/ui/TrackingItem';
import React from 'react';
import { getAvancement } from 'service/dbBookOptions.service';

//Fake book list :
const fakeBookList = [
    {
        identifier: "2070515796",
        title: "Le seigneur des anneaux",
        creators: "J.R.R. Tolkien",
        publisher: "Gallimard-Jeunesse",
        date: "2000",
        avancement: 0
    },
    {
        identifier: "9782075094559",
        title: "Harry Potter",
        creators: "J.K. Rowling",
        publisher: "Gallimard",
        date: "2018",
        avancement: 0
    },
    {
        identifier: "2070555518",
        title: "Le petit prince",
        creators: "Antoine de Saint-Exupéry",
        publisher: "Gallimard",
        date: "2003",
        avancement: 0
    }
];

const TrackingBookList: React.FC = () => {
    const [books, setBooks] = React.useState(fakeBookList);

    React.useEffect(() => {
        const fetchAvancement = async () => {
            const updatedBooks = await Promise.all(fakeBookList.map(async (book) => ({
                ...book,
                avancement: await getAvancement(1, book.identifier) || 0
            })));
            setBooks(updatedBooks);
        };

        fetchAvancement();
    }, []);

    return (
        <div>
            {books.map((book, index) => (
                <TrackingItem key={index} book={book} />
            ))}
        </div>
    );
};

export default TrackingBookList;