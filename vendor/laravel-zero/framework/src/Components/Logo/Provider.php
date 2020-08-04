<?php

declare(strict_types=1);

/**
 * This file is part of Laravel Zero.
 *
 * (c) Nuno Maduro <enunomaduro@gmail.com>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 */

namespace LaravelZero\Framework\Components\Logo;

use function class_exists;
use Illuminate\Console\Application as Artisan;
use LaravelZero\Framework\Components\AbstractComponentProvider;

/**
 * @internal
 */
final class Provider extends AbstractComponentProvider
{
    /**
     * {@inheritdoc}
     */
    public function isAvailable(): bool
    {
        return class_exists(\Laminas\Text\Figlet\Figlet::class)
            && is_array($this->app['config']->get('logo', false));
    }

    /**
     * {@inheritdoc}
     */
    public function register(): void
    {
        $config = $this->app['config'];

        if ($config->get('logo.enabled', false)) {
            Artisan::starting(
                function ($artisan) use ($config) {
                    $artisan->setName(
                        (string) new FigletString($config->get('app.name'), $config->get('logo', []))
                    );
                }
            );
        }
    }
}
