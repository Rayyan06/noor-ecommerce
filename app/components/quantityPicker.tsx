interface QuantityPickerProps {
  quantity: number;
  maxQuantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  submitOnChange?: boolean;
}

export default function QuantityPicker({
  quantity,
  setQuantity,
  maxQuantity,
  submitOnChange = false,
}: QuantityPickerProps) {
  const updateQuantity = (newQuantity: number) => {
    if (quantity > 1 || quantity < maxQuantity) setQuantity(newQuantity);
  };
  return (
    <div className="flex items-center">
      <button
        className="px-4 py-2 hover:shadow-sm font-bold text-lg hover:text-teal-500 hover:bg-gray-100 hover:font-bold"
        onClick={() => updateQuantity(quantity - 1)}
        type={submitOnChange ? 'submit' : 'button'}
      >
        -
      </button>
      <input
        className="block border-0 w-24 h-full py-2.5 ring-0 ring-inset items-center justify-center text-center ring-gray-300 focus:ring-2 focus:ring-gray-200 bg-white"
        type="number"
        value={quantity}
        onChange={(e) => {
          updateQuantity(Number(e.target.value));
        }}
        name="quantity"
        id="quantity"
      />

      <button
        className="px-4 py-2 hover:shadow-sm font-bold text-lg hover:text-teal-500 hover:bg-gray-100 hover:font-bold"
        onClick={() => updateQuantity(quantity + 1)}
        type={submitOnChange ? 'submit' : 'button'}
      >
        +
      </button>
    </div>
  );
}
