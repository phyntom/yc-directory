import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search, X } from 'lucide-react';

interface SearchFormProps {
	query?: string;
}
function SearchForm({ query }: SearchFormProps) {
	return (
		<Form action='/' scroll={false} className='search-form'>
			<input name='query' className='search-input' defaultValue={query} placeholder='Search Startups' />
			<div className='flex gap-2'>
				{query && <SearchFormReset />}
				<button type='submit' className='search-btn text-white'>
					<Search className='size-5' />
				</button>
			</div>
		</Form>
	);
}

export default SearchForm;
