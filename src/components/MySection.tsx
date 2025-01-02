import {FC} from 'react';

const MySection: FC<{children:any}> = ({children}) => {
    return (
        <section>
            {children}
        </section>
    );
};

export default MySection;
