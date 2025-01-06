import {FC} from 'react';

// Composant ()

const MySection: FC<{children:any}> = ({children}) => {
    return (
        <section>
            {children}
        </section>
    );
};

export default MySection;
