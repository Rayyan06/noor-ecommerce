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
    if (newQuantity > 0 && newQuantity < 20) {
      setQuantity(newQuantity);
    }
  };
  return (
    <div className="grid grid-rows-1 grid-cols-3 items-center h-10 w-full md:w-48">
      <button
        className="flex items-center justify-center rounded-l-md h-full border-2 hover:shadow-sm font-semibold text-xl hover:text-teal-500 hover:bg-gray-100"
        onClick={() => updateQuantity(quantity - 1)}
        type={submitOnChange ? 'submit' : 'button'}
      >
        -
      </button>
      <input
        className=" border-y-2 h-10  py-2.5 ring-0 ring-inset items-center justify-center text-center ring-gray-300 focus:ring-2 focus:ring-gray-200 bg-white"
        type={'number'}
        value={quantity}
        name="quantity"
        id="quantity"
        onChange={(e) => {
          updateQuantity(Number(e.target.value));
        }}
      />

      <button
        className=" flex items-center justify-center rounded-r-md h-full border-2 hover:shadow-sm font-semibold text-xl hover:text-teal-500 hover:bg-gray-100"
        onClick={() => updateQuantity(quantity + 1)}
        type={submitOnChange ? 'submit' : 'button'}
      >
        +
      </button>
    </div>
  );
}
