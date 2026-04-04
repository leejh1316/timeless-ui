import { composeRefs } from "../../hooks/useComposeRefs";
import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/* @__NO_SIDE_EFFECTS__ */
//Slot을 만드는 고차함수
export function createSlot(ownerName: string) {
  // 슬롯의 복제
  const SlotClone = createSlotClone(ownerName);
  const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    // Slot의 자식 요소를 배열로 전환하여 Slottable 컴포넌트를 찾는다.
    // 리액트의 children은 단일 객체, 배열, 문자열 등 다양한 형태를 가질 수 있기 때문에 React.Children.toArray를 사용하여 children을 배열로 변환한다.
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      // Slottable의 자식으로 전달된 요소가 렌더링할 새로운 요소가 된다.
      // newElement는 Slottable의 직계 자식으로 무조건 단일 요소여야 한다. 따라서 children이 여러개인 경우 오류를 발생시켜야 한다.
      const newElement = slottable.props.children;

      // slottable의 자식요소로 전한될 요소를 만든다.
      const newChildren = childrenArray.map((child) => {
        // 슬롯의 자식 요소 중 Slottable 컴포넌트인 경우, Slottable 하위 요소를 그대로 자식요소로 사용한다.
        if (child === slottable) {
          // because the new element will be the one rendered, we are only interested
          // in grabbing its children (`newElement.props.children`)
          // Slottable 바로 하위 요소는 Slot에 위치할 요소이기 때문에 무조건 단일 요소여야 한다. 따라서 children이 여러개인 경우 오류를 발생시킨다.
          if (React.Children.count(newElement) > 1) return React.Children.only(null);
          // Slottable 하위 요소가 유효한 React 요소인 경우, 해당 요소의 children을 반환한다. 그렇지 않은 경우 null을 반환한다.
          return React.isValidElement(newElement) ? (newElement.props as { children: React.ReactNode }).children : null;
        } else {
          // Slottable 컴포넌트가 아닌 경우, 해당 요소를 그대로 반환한다.
          return child;
        }
      });

      // Slot에서 전달된 props와 Slottable 하위 요소의 props를 병합하여 새로운 요소를 렌더링한다.
      return (
        <SlotClone {...slotProps} ref={forwardedRef}>
          {React.isValidElement(newElement) ? React.cloneElement(newElement, undefined, newChildren) : null}
        </SlotClone>
      );
    }

    // slottable이 없는 경우, Slot의 자식 요소를 그대로 렌더링한다.
    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {children}
      </SlotClone>
    );
  });

  Slot.displayName = `${ownerName}.Slot`;
  return Slot;
}

const Slot = createSlot("Slot");

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children: React.ReactNode;
}

/* @__NO_SIDE_EFFECTS__ */
// createSlotClone은 Slot의 원본 컴포넌트로, Slot을 양산하는 공장과 같은 역할을 한다.
// param인 ownerName은 상표와 같은 역할을 한다(SlotClone의 displayName에 사용된다.)
// 이 함수는 크게 세 가지 일을 한다.
// 1. SlotClone 컴포넌트를 생성한다. 이 컴포넌트는 Slot이 렌더링할 때 실제로 렌더링되는 컴포넌트이다.
// 2. SlotClone은 자식 요소가 유효한 React 요소인지 확인하고, 그렇다면 해당 요소의 props와 Slot에서 전달된 props를 병합한다.
// 3. 병합된 props를 사용하여 자식 요소를 복제하여 렌더링한다.
function createSlotClone(ownerName: string) {
  // 1. SlotClone 컴포넌트 생성
  const SlotClone = React.forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
    const { children, ...slotProps } = props;

    // 2. 자식 요소가 유요한 React 요소인지 확인한다.
    // 자식 요소를 변형하여 복제하는 역할을 한다.
    if (React.isValidElement(children)) {
      // 자식요소의 Ref 참조를 를 가져온다.
      const childrenRef = getElementRef(children);
      const props = mergeProps(slotProps, children.props as AnyProps);
      // do not pass ref to React.Fragment for React 19 compatibility
      // 리액트 19버전에서는 ref도 props로 전달할 수 있도록 변경되었다.
      // React.Fragment는 아직 ref를 지원하지 않지만 Canary에선 Fragment도 ref를 전달받을 수 있다.
      // 이경우, 일반적인 DOM 노드가 아닌 FragmentInstance라는 객체가 ref로 전달된다.
      // Fragment에 ref를 전달하는 경우 경고가 발생하기 떄문에 Fragment인 경우 ref를 전달하지 않도록 한다.

      if (children.type !== React.Fragment) {
        // 자식 요소가 Fragment가 아닌 경우 ref를 병합하여 전달한다.
        props.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React.cloneElement(children, props);
    }

    // 3. 2번을 통과하지 못한 경우 다음의 상황을 판단한다.
    // 자식 요소가 2개 이상이면 오류를 발생시킨다.
    // 자식 요소가 React.Element가 아니라면 null을 반환한다. (텍스트 노드 등)
    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  });

  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

// 유일한 식별자를 생성하여 Slottable 컴포넌트를 구분하는데 사용한다.
const SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");

interface SlottableProps {
  children: React.ReactNode;
}

interface SlottableComponent extends React.FC<SlottableProps> {
  __radixId: symbol;
}

// createSlottable은 Slottable 컴포넌트를 생성하는 고차 함수다.
// Slottable를 식별할 수 있도록 고유한 식별자를 생성하여 Slottable 컴포넌트에 할당한다.
// Slot에서 단일 요소가 아닌 형제가 있는 형태의 children 일 때 Slottable 컴포넌트를 사용하여 Slot에서 렌더링할 요소를 명시적으로 지정할 수 있도록 한다.
// 사용방법은 다음과 같다.
// 1. Slot 컴포넌트의 자식요소로 Slottable 컴포넌트를 사용한다.
// 2. Slottable 컴포넌트의 자식 요소는 Slot에서 렌더링할 요소가 된다.
// 3. Slot은 Slottable 컴포넌트를 찾아서 Slottable 하위 요소를 Slot의 렌더링 요소로 사용한다.
// 4. Slot의 하위 children 요소는 Slottable 직계 요소의 children이 된다.
/* @__NO_SIDE_EFFECTS__ */ export function createSlottable(ownerName: string) {
  const Slottable: SlottableComponent = ({ children }) => {
    return <>{children}</>;
  };
  Slottable.displayName = `${ownerName}.Slottable`;
  Slottable.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable;
}

const Slottable = createSlottable("Slottable");

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>;

// isSlottable은 주어진 React 노드가 Slottable 컴포넌트인지 확인하는 함수다.
// 판별 방법은 다음과 같다.
// 1. React 요소인지 확인한다.
// 2. 요소의 타입이 함수인지 확인한다. (함수형 컴포넌트인지 확인)
// 3. 등록한 식별자 키가 요소의 타입에 존재하는지 확인한다.
// 4. 요소의 타입에 등록한 식별자 키의 값이 SLOTTABLE_IDENTIFIER와 일치하는지 확인한다.
function isSlottable(child: React.ReactNode): child is React.ReactElement<SlottableProps, typeof Slottable> {
  return (
    React.isValidElement(child) &&
    typeof child.type === "function" &&
    "__radixId" in child.type &&
    child.type.__radixId === SLOTTABLE_IDENTIFIER
  );
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  // 자식 요소의 모든 props는 slot에 전달된 props보다 우선하여 적용한다.
  const overrideProps = { ...childProps };

  // props 객체가 가진 모든 키에 대해서 병합하는 반복문
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    // 이벤트 핸들러인 경우 slot과 child 양쪽에 존재할 수 있으니 두 함수를 합성해서 호출해야 한다.
    // react에서 이벤트핸들러는 on{EventName} 형태로 작성된다. 따라서 propName이 on으로 시작하고 뒤에 대문자가 오는 경우 이벤트 핸들러로 간주한다.
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      // 이벤트 핸들러가 slot과 child 양쪽에 존재하는 경우, 두 함수를 합성하여 호출한다.
      if (slotPropValue && childPropValue) {
        // 자식의 이벤트 핸들러가 먼저 호출되고, 그 다음에 slot의 이벤트 핸들러가 호출되도록 합성한다.
        overrideProps[propName] = (...args: unknown[]) => {
          // 특정 이벤트 헨들러의 반환값으로 사이드 이펙트를 발생하는 경우가 있기에 childPropValue의 반환값을 저장하여 반환한다.
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      }
      // but if it exists only on the slot, we use only this one
      // 이벤트 핸들러가 slot에만 존재하거나, child의 핸들러가 falsy한 경우 slot의 이벤트 핸들러만 사용한다.
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    // style의 경우 slot과 child 양쪽에 존재할 수 있으니 두 스타일 객체를 병합해서 사용해야 한다.
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }
    // className의 경우 slot과 child 양쪽에 존재할 수 있으니 두 클래스 이름을 공백으로 구분하여 합쳐서 사용해야 한다.
    else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  // 그 외의 props는 자식 요소의 props가 slot에 전달된 props보다 우선하여 적용된다.
  return { ...slotProps, ...overrideProps };
}

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.

// React 19에서 일반적인 props로 ref를 전달할 수 있게 변경됨에 따라
// element.ref 접근은 이후 릴리즈 에서 제거된다는 경고가 발생한다.
// React 19 이후 버전에서는 element.props.ref로 접근해야 하며
// React 19 이전 버전에서는 element.ref로 접근해야 한다.
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  // React 18 버전에서는 element.props.ref로 접근시 정의된 get 프로퍼티 의해 React의 경고가 발생한다.
  // 간단하게 살펴보자면 이런식으로 지정되어 있다.
  // function warnAboutAccessingRef() {} // React 경고 메시지가 포함된 함수
  // warnAboutAccessingRef.isReactWarning = true; // React 경고 메시지가 포함된 함수임을 나타내는 플래그
  // Object.defineProperty(props, 'ref', {
  // configurable: false,
  // enumerable: false,
  // get: warnAboutAccessingRef, // props.ref에 접근할 때 React 경고 메시지가 포함된 함수가 호출된다.
  // })
  // 따라서 element.props.ref에 접근할때 React 경고 메시지가 포함된 함수가 반환되는지 확인하여 React 18 버전인지 판단할 수 있다.
  // Object.getOwnPropertyDescriptor는 객체의 속성에 대한 설명자를 반환하는 메서드로 props 객체에서 ref 속성에 대한 설명자를 가져와서 get 프로퍼티를 확인한다.
  // 이 Object.getOwnPropertyDescriptor를 사용하지 않고 element.props.ref 에 직접 접근하면 get 프로퍼티에 의해 get 메서드가 자동으로 호출되어 경고를 호출하게 된다.
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  // React 18과 같이 경고가 발생하는지 판단하여 React 19 버전인지 판단한다.
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> }).ref;
  }

  // Not DEV
  // dev모드가 아닌 경우엔 존재하는 ref를 반환한다. 잘못된 ref로 접근하는경우엔 undefined가 반환되기 때문에 React 버전에 상관없이 올바른 ref에 접근할 수 있다.
  return (element.props as { ref?: React.Ref<unknown> }).ref || (element as any).ref;
}

export {
  Slot,
  Slottable,
  //
  Slot as Root,
};
export type { SlotProps };
