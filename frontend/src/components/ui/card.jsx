//frontend/src/components/ui/card.jsx

import * as React from "react"
import PropTypes from 'prop-types'

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
))
Card.displayName = "Card"
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const CardHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"
CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const CardTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"
CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const CardDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"
CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const CardFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }