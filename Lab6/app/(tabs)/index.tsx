import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, multiply, reset } from "@/counterSlice";

const Counter = () => {
  const count = useSelector((state:any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Giá trị đếm: {count}</h1>
      <button onClick={() => dispatch(increment())}>Tăng</button>
      <button onClick={() => dispatch(decrement())}>Giảm</button>
      <button onClick={() => dispatch(multiply(2))}>Nhân 2</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
