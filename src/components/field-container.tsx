import classnames from "classnames";
import React, { ComponentPropsWithoutRef, ReactElement, forwardRef } from "react";

export type FieldContainerProps = {
  startDecorator?: ReactElement;
  endDecorator?: ReactElement;
}

export const FieldContainer = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & FieldContainerProps>(
  ({ className, children, startDecorator, endDecorator, ...props }, ref) => {
    return (
      <div ref={ref}
        className={classnames(className, 'axlt-field-container',
          {
            'has-start-decorator': startDecorator != undefined,
            'has-end-decorator': endDecorator != undefined
          }
        )}
        {...props}
      >
        {startDecorator && <div className={classnames('start-decorator')}>{startDecorator}</div>}
        {children}
        {endDecorator && <div className={classnames('end-decorator')}>{endDecorator}</div>}
      </div>
    )
  });

FieldContainer.displayName = 'FieldContainer';