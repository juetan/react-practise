import * as React from 'react';

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

interface SearchBarProps {
  keyword: string;
  stocked: boolean;
  onKeywordChange: (val: string) => void;
  onStockedChange: (val: boolean) => void;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { keyword, stocked, onKeywordChange, onStockedChange } = props;
  return (
    <div>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="请输入关键字"
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={stocked}
          onChange={(e) => onStockedChange(e.target.checked)}
          style={{ margin: 0 }}
        />
        <span>仅显示库存</span>
      </label>
    </div>
  );
};

const SearchCategoryRow = ({ name }) => {
  return (
    <tr>
      <td colSpan={2}>{name}</td>
    </tr>
  );
};
const SearchProductRow = ({ name, price }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
};

interface SearchTableProps {
  products: Product[];
  keyword: string;
  stocked: boolean;
}
const SearchTable: React.FC<SearchTableProps> = (props) => {
  const { products, keyword, stocked } = props;

  const rows = [];
  const cats = new Set();

  products.forEach((product) => {
    if (stocked && !product.stocked) {
      return;
    }
    if (keyword && !product.name.includes(keyword)) {
      return;
    }
    if (!cats.has(product.category)) {
      cats.add(product.category);
      rows.push(<SearchCategoryRow name={product.category} />);
    }
    rows.push(<SearchProductRow name={product.name} price={product.price} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>商品名称</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>{...rows}</tbody>
    </table>
  );
};

interface ProductTableProps {
  products: Product[];
}
const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [keyword, setKeyword] = React.useState('');
  const [stocked, setStocked] = React.useState(false);
  return (
    <div className="product-table">
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        stocked={stocked}
        onStockedChange={setStocked}
      ></SearchBar>
      <SearchTable products={products} stocked={stocked} keyword={keyword} />
    </div>
  );
};

export default ProductTable;
