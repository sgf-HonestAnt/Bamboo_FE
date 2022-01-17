import { CUSTOM_COLORS } from "../../utils/const/arr";

export default function ColorPalette() {
  return (
    <div>
      {/* {CUSTOM_COLORS.map((color) => (
        <span
          style={{
            backgroundColor: `${color}`,
            fontSize: "x-small",
            color: "var(--main-text)",
            border: "1px solid black",
          }}>
          {color}
        </span>
      ))} */}
      <span
        className='m-1'
        style={{ backgroundColor: "hsla(var(--black),1)", color: "white" }}>
        black
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--blue-green-color-wheel),1)",
          color: "white",
        }}>
        blue-green-color-wheel
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--castleton-green),1)",
          color: "white",
        }}>
        castleton-green
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--bottle-green),1)",
          color: "white",
        }}>
        bottle-green
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--spanish-viridian),1)",
          color: "white",
        }}>
        spanish-viridian
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--green-ncs),1)",
          color: "white",
        }}>
        green-ncs
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--caribbean-green),1)",
          color: "white",
        }}>
        caribbean-green
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--medium-aquamarine),1)",
          color: "white",
        }}>
        medium-aquamarine
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--teal-blue),1)",
          color: "black",
        }}>
        teal-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--prairie-blue),1)",
          color: "black",
        }}>
        prairie-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--beachhouse-blue),1)",
          color: "black",
        }}>
        beachhouse-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--true-blue),1)",
          color: "black",
        }}>
        true-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--deeper-blue),1)",
          color: "black",
        }}>
        deeper-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--aero-blue),1)",
          color: "black",
        }}>
        aero-blue
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--honeydew),1)",
          color: "black",
        }}>
        honeydew
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--pale-stone),1)",
          color: "black",
        }}>
        pale-stone
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--mint-cream),1)",
          color: "black",
        }}>
        mint-cream
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--pale-sunbeam),1)",
          color: "black",
        }}>
        pale-sunbeam
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--gold),1)",
          color: "black",
        }}>
        gold
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--mustard),1)",
          color: "black",
        }}>
        mustard
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--mustard-khaki),1)",
          color: "black",
        }}>
        mustard-khaki
      </span>
      <span
        className='m-1'
        style={{
          backgroundColor: "hsla(var(--sunset-beach),1)",
          color: "black",
        }}>
        sunset-beach
      </span>
    </div>
  );
}
