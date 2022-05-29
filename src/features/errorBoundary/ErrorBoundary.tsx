import { Component, ErrorInfo } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';

interface IErrorState {
    error: boolean
}

interface IChildrenProps {
    children: React.ReactNode;
}

class ErrorBoundary extends Component<IChildrenProps, IErrorState> {
    state = {
        error: false
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error, errorInfo);

        this.setState({
            error: true
        })
    }

    render() {
        if (!this.state) {
            return <ErrorMessage />
        }

        return (
            this.props.children
        )
    }
}

export default ErrorBoundary;