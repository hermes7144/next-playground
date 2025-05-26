import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Button as ShadcnUIButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

interface ButtonProps

  extends React.ButtonHTMLAttributes<HTMLButtonElement>,

  VariantProps<typeof buttonVariants> 
  {
    asChild?: boolean;
    icon?: React.ReactNode;
    iconPlacement?: 'left' | 'right';
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    // ✨ ButtonProps 에서 정의한 모든 prop들을 여기서 받습니다. ✨
    className,
    // ✨ Shadcn Button의 variant 와 size prop! 기본값을 설정할 수 있습니다. ✨
    variant = "default", // ✨ 기본 variant 를 'default' 로 설정! ✨
    size = "default", // ✨ 기본 size 를 'default' 로 설정! ✨
    asChild = false,

    // ✨ 아이콘 관련 prop들! ✨
    icon, // 아이콘 React Node
    iconPlacement = 'left', // 아이콘 위치 (기본값 'left')

    // ✨ 기본 HTML Button prop들과 나머지 prop들! ✨
    children, // 버튼 내용
    ...props // 나머지 모든 prop들 (onClick, type, disabled, style, id, aria-label 등)
  }, ref) => {

    // ✨ ✨ 1. 전달받은 prop들을 바탕으로 Shadcn Button에 전달할 '최종 className' 결정! ✨ ✨
    // cn 유틸리티 함수는 Tailwind 클래스 문자열들을 합쳐줍니다.
    const finalClassNames = cn(
      buttonVariants({ variant, size }), // ✨ Shadcn Button의 variant/size 에 따른 기본 스타일 클래스! ✨

      "font-semibold", // 예: 모든 버튼에 항상 굵은 글씨체 적용
      "transition-colors duration-200", // 예: 색상 변경 애니메이션

      className // ✨ 공통 Button 컴포넌트 사용 시 추가로 넘겨주는 Tailwind 클래스들 (가장 마지막에 합쳐져서 다른 클래스 오버라이드 가능)! ✨
    );

    // ✨ ✨ 2. 아이콘과 children (버튼 내용) 렌더링 순서 결정! ✨ ✨
    // iconPlacement prop 값에 따라 아이콘과 children 의 순서를 바꿉니다.
    const content = (
      <> {/* React Fragment 사용 */}
        {iconPlacement === 'left' && icon} {/* iconPlacement 가 'left' 이면 아이콘 먼저 렌더링 */}
        {children} {/* 버튼 내용 렌더링 */}
        {iconPlacement === 'right' && icon} {/* iconPlacement 가 'right' 이면 아이콘 나중에 렌더링 */}
      </>
    );

    // ✨ 3. Shadcn UI Button 컴포넌트 렌더링! ✨
    return (
      // ✨ ✨ Shadcn UI Button (import 해온 그 컴포넌트!) 사용! ✨ ✨
      <ShadcnUIButton
        className={finalClassNames} // ✨ Step 1에서 결정한 최종 클래스 문자열 전달! ✨
        variant={variant} // ✨ 외부에서 받은 variant prop 그대로 전달! ✨
        size={size} // ✨ 외부에서 받은 size prop 그대로 전달! ✨
        asChild={asChild} // ✨ 외부에서 받은 asChild prop 그대로 전달! ✨
        ref={ref} // ✨ ✨ forwardRef 로 전달받은 ref 연결! ✨ ✨
        {...props} // ✨ ✨ 나머지 모든 prop들 (onClick, type, disabled 등!) 전달! ✨ ✨
      >
        {/* ✨ ✨ 아이콘과 children (버튼 내용) 렌더링! ✨ ✨ */}
        {content}
      </ShadcnUIButton>
    );
  }
);

Button.displayName = 'Button';

Button.displayName = 'Button';

export { Button };
export type { ButtonProps }; 
